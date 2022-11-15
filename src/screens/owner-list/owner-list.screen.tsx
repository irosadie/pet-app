import { FC, useEffect, memo, useReducer, useState, Reducer } from 'react'
import { FlatList, View, StyleSheet, Text } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useIsFocused } from '@react-navigation/native'
import axios from '$services/index'
import {
    Wrapper,
    Container,
    HeaderTitleOwner,
    OwnerListCard,
    VacuumSpace,
    NoDataDisplay
} from '$components/index'
import { useAppDispatch } from '$stores/index'
import { storeMaster } from '$stores/action'
import { TXT } from '$strings/text'
import { CLR } from '$strings/color'
import { API } from '$strings/service'
import { Owners } from '$types/namespace'

type ListDataProps = {
    loading: boolean,
    owners: Owners.Owner[]
}

let currentPage = 1;
let maxPage: number;

type OwnerListProps = NativeStackScreenProps<MainNavigation, 'OwnerList'>
const OwnerList: FC<OwnerListProps> = (props) => {

    let { navigation } = props
    const dispatch = useAppDispatch()

    const isListOwner: Partial<ListDataProps> = {
        loading: false,
        owners: []
    }

    const _reducer = <T,>(state: T, newState: Partial<T>): T => {
        return {
            ...state,
            ...newState
        }
    }

    const [ownersList, setOwnersList] = useReducer<Reducer<Partial<ListDataProps>, Partial<ListDataProps>>>(_reducer, isListOwner);
    const [loadMoreProgess, setloadMoreProgess] = useState(false);
    const [filterCondition, setFilterCondition] = useState<"Name" | "Number of Cats">(TXT.LABEL_SORT_BY_NAME);

    const isFocused = useIsFocused();

    const _ownerListOnPress = (id: number) => {
        navigation.navigate('OwnerDetail', { id: id })
    }

    const _favoriteIconOnPress = (id: number) => {
        axios({
            method: 'POST',
            url: API.FAVORITE,
            data: { id: id }
        }).then(() => {
            if (ownersList.owners) {
                let index = ownersList.owners.map(item => item.id).indexOf(id);
                ownersList.owners[index] = { ...ownersList.owners[index], is_favorite: !ownersList.owners[index]['is_favorite'] }
                setOwnersList({ owners: ownersList.owners })
            }
        })
    }

    const _filterOnPress = () => {
        let sort = 'first_name'
        setFilterCondition(TXT.LABEL_SORT_BY_NAME)
        if (filterCondition === TXT.LABEL_SORT_BY_NAME) {
            sort = '-pet_total'
            setFilterCondition(TXT.LABEL_SORT_BY_NUMBER)
        }
        axios<Owners.RootObject>({
            method: 'GET',
            url: API.OWNER_LIST,
            params: { sort: sort }
        }).then(({ owners, info }) => {
            setOwnersList({ owners: owners, loading: false })
            maxPage = info.total ? Math.ceil(info.total / info.pagination.per_page) : 1
            currentPage = 1
        })
    }

    const _onLoadMore = () => {
        if (!loadMoreProgess && (currentPage < maxPage)) {
            setloadMoreProgess(true)
            currentPage += 1
            axios<Owners.RootObject>({
                method: 'GET',
                url: API.OWNER_LIST,
                params: {
                    page: currentPage,
                    sort: filterCondition == TXT.LABEL_SORT_BY_NAME ? "first_name" : filterCondition == TXT.LABEL_SORT_BY_NUMBER ? "-pet_total" : ""
                }
            }).then(({ owners }) => {
                if (ownersList.owners) {
                    setOwnersList({ owners: [...ownersList.owners, ...owners] })
                }
                setloadMoreProgess(false)
            }).catch(() => {
                currentPage -= 1
                setloadMoreProgess(false)
            })
        }
    }

    const _onScreenFocus = () => {
        setOwnersList({ loading: true })
        Promise.all([
            axios<Owners.RootObject>({
                method: 'GET',
                url: API.OWNER_LIST,
                params: {}
            }).then(({ owners, info }) => {
                return { owners, info }
            }),
            axios<Owners.OwnerMaster>({
                method: 'GET',
                url: API.GET_MASTER,
                params: {}
            }).then(({ owner }) => {
                return owner
            })]).then((results) => {
                let { info, owners } = results[0]
                setOwnersList({ owners: owners, loading: false })
                maxPage = info.total ? Math.ceil(info.total / info.pagination.per_page) : 1
                if (results[1]) {
                    let { id, first_name, last_name } = results[1]
                    let full_name = last_name ? `${first_name} ${last_name}` : last_name
                    dispatch(storeMaster({ name: full_name ?? "", id: id }))
                }
            }).catch((err) => {
                setOwnersList({ loading: false })
            });
    }

    useEffect(() => {
        _onScreenFocus()
        currentPage = 1
    }, [isFocused])

    return (
        <Container loading={ownersList.loading ?? true}>
            <OwnerListComponent
                data={ownersList.owners}
                onPress={_ownerListOnPress}
                onLoadMore={_onLoadMore}
                favoriteIconOnPress={_favoriteIconOnPress}
                filterOnPress={_filterOnPress}
                touchableTitle={filterCondition}
            />
        </Container>
    )
}

type OwnerListComponentProps = {
    data: any,
    onLoadMore: () => void,
    onPress: (id: number) => void,
    favoriteIconOnPress: (id: number) => void,
    filterOnPress: () => void,
    touchableTitle: string,
}
const OwnerListComponent: FC<OwnerListComponentProps> = (props) => {
    let { data, touchableTitle, onPress, favoriteIconOnPress, filterOnPress, onLoadMore } = props
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => {
                let { id, first_name, last_name, is_favorite } = item
                let full_name = last_name ? `${first_name} ${last_name}` : first_name
                return (
                    <RenderItem
                        key={id}
                        title={full_name}
                        isFavorite={is_favorite}
                        onPress={() => onPress(id)}
                        favoriteIconOnPress={() => favoriteIconOnPress(id)}
                    />
                )
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            numColumns={1}
            keyExtractor={item => item.id}
            stickyHeaderIndices={[0]}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.1}
            ListHeaderComponent={() => <Header
                filterOnPress={filterOnPress}
                title={TXT.LABEL_OWNERS_LIST}
                subtitle={`${TXT.LABEL_SORT_BY} `}
                touchableTitle={touchableTitle}
            />}
            ItemSeparatorComponent={() => <VacuumSpace />}
            ListFooterComponent={() => <VacuumSpace height={24} />}
            ListEmptyComponent={<Wrapper style={styles.mt18}><NoDataDisplay message={TXT.LABEL_NO_OWNER} /></Wrapper>}
        />
    )
}

type HeaderProps = {
    filterOnPress: () => void,
    title: string,
    subtitle: string,
    touchableTitle: string,
}
const Header: FC<HeaderProps> = (props) => {
    let { title, subtitle, touchableTitle, filterOnPress } = props
    return (
        <Wrapper>
            <View style={styles.headerWrap}>
                <HeaderTitleOwner
                    title={title}
                    subtitle={subtitle}
                    touchableTitle={touchableTitle}
                    rectangle
                    filterOnPress={filterOnPress}
                />
            </View>
        </Wrapper>
    )
}

interface RenderItemProps extends Omit<OwnerListComponentProps, "data" | "filterOnPress" | "onLoadMore" | "touchableTitle"> {
    title: string;
    isFavorite: boolean;
    onPress: () => void;
    favoriteIconOnPress: () => void
}
const RenderItem = memo<RenderItemProps>((props) => {
    let { title, isFavorite, favoriteIconOnPress, onPress } = props
    return (
        <Wrapper>
            <OwnerListCard
                title={title}
                isFavorite={isFavorite}
                favoriteIconOnPress={favoriteIconOnPress}
                onPress={onPress}
            />
        </Wrapper>
    )
})

const styles = StyleSheet.create({
    mt18: { marginTop: 72 },
    headerWrap: {
        paddingTop: 24,
        paddingBottom: 16,
        marginBottom: 8,
        backgroundColor: CLR.BG_MAIN
    }
})

export type { OwnerListProps }
export default OwnerList