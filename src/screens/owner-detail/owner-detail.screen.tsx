import React, {
    FC,
    memo,
    useEffect,
    useReducer,
    Reducer,
    ReactNode,
    Fragment
} from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import Toast from 'react-native-toast-message'
import axios from '$root/src/services/func.service'
import unix2WordDiff from '$root/src/utils/unix-to-word-diff'
import RNShake from 'react-native-shake';
import {
    Wrapper,
    Container,
    PetListCard,
    Button,
    HeaderTitle,
    OwnerCard,
    OwnerCardProps,
    VacuumSpace,
    NoDataDisplay
} from '$components/index'
import { useAppDispatch, useAppSelector } from '$stores/index'
import { storeMaster, starLoading, endLoading } from '$stores/action'
import { TXT } from '$strings/text'
import { API } from '$root/src/strings/service'
import { Owners, Pets } from '$types/namespace'

type DetailDataProps = {
    loading: boolean,
    owner: Partial<Owners.Owner>,
    pets: Pets.Pet[],
}

type OwnerDetailProps = NativeStackScreenProps<MainNavigation, 'OwnerDetail'>
const OwnerDetail: FC<OwnerDetailProps> = (props) => {

    let { route } = props
    let master = useAppSelector((state) => state.master)

    const isDetailOwner: Partial<DetailDataProps> = {
        loading: false
    }
    const _reducer = <T,>(state: T, newState: Partial<T>): T => {
        return {
            ...state,
            ...newState
        }
    }

    const [detailOwner, setDetailOwner] = useReducer<Reducer<Partial<DetailDataProps>, Partial<DetailDataProps>>>(_reducer, isDetailOwner);

    const dispatch = useAppDispatch()

    const _favoriteIconOnPress = () => {
        axios({
            method: 'POST',
            url: API.FAVORITE,
            data: { id: route.params.id }
        }).then(() => {
            setDetailOwner({ owner: { ...detailOwner.owner, is_favorite: !detailOwner.owner?.is_favorite } })
        })
    }

    const _buttonMasterOnPress = () => {
        if (route.params.id === master.id) {
            Toast.show({
                type: TXT.TYPE_WARNING,
                text1: TXT.LABEL_OUPS,
                text2: TXT.LABEL_ALREADY_MASTER,
            });
            return
        }
        dispatch(starLoading())
        axios<{ data: string }>({
            method: 'POST',
            url: API.CREATE_MASTER,
            data: { id: route.params.id }
        }).then(({ data }) => {
            dispatch(endLoading())
            Toast.show({
                type: TXT.TYPE_SUCCESS,
                text1: TXT.MSG_ADD_MASTER_SUCCESS,
                text2: data,
            });
            let full_name = detailOwner.owner?.last_name ? `${detailOwner.owner?.first_name} ${detailOwner.owner?.last_name}` : detailOwner.owner?.last_name
            dispatch(storeMaster({ name: full_name ?? "", id: route.params.id }))
        }).catch((err) => {
            dispatch(endLoading())
        })
        return
    }

    useEffect(() => {
        setDetailOwner({ loading: true });
        Promise.all([
            axios<{ owner: Owners.Owner }>({
                method: 'GET',
                url: API.OWNER_DETAIL,
                params: { owner_id: route.params.id }
            }).then(({ owner }) => {
                return owner
            }),
            axios<Pets.RootObject>({
                method: 'GET',
                url: API.PET_LIST,
                params: { owner_id: route.params.id }
            }).then(({ pets }) => {
                return pets
            })]).then((results) => {
                setDetailOwner({ owner: results[0], pets: results[1], loading: false });
            }).catch((err) => {
                setDetailOwner({ loading: false });
            });
    }, [])

    React.useEffect(() => {
        const subscription = RNShake.addListener(() => {
            _buttonMasterOnPress()
        })
        return () => {
            subscription.remove()
        }
    }, [])

    return (
        <Container loading={detailOwner.loading}>
            <OwnerDetailComponent
                mainTitle={TXT.LABEL_OWNER_CARD}
                secondaryTitle={TXT.LABEL_CATS}
                ownerData={{
                    firstName: detailOwner.owner?.first_name ?? "",
                    lastName: detailOwner.owner?.last_name,
                    isFavorite: detailOwner.owner?.is_favorite,
                    favoriteIconOnPress: _favoriteIconOnPress
                }}
                cats={detailOwner.pets}
                buttonMasterOnPress={_buttonMasterOnPress}
            />
        </Container>
    )
}

type HeaderProps = {
    mainTitle: string,
    secondaryTitle: string,
    children: ReactNode
}
const Header: FC<HeaderProps> = (props) => {
    let { mainTitle, secondaryTitle, children } = props
    return (
        <Wrapper>
            <View style={styles.headerWrapper}>
                <View style={styles.mb4}>
                    <HeaderTitle title={mainTitle} />
                </View>
                {children}
                <View style={styles.mt6}>
                    <HeaderTitle title={secondaryTitle} />
                </View>
            </View>
        </Wrapper>
    )
}

type OwnerDetailComponentProps = {
    mainTitle: string,
    secondaryTitle: string,
    ownerData: OwnerCardProps,
    cats: any,
    buttonMasterOnPress: () => void
}
const OwnerDetailComponent: FC<OwnerDetailComponentProps> = (props) => {
    let { mainTitle, secondaryTitle, ownerData, cats, buttonMasterOnPress } = props
    let { firstName, lastName, isFavorite, favoriteIconOnPress } = ownerData

    return (
        <Fragment>
            <FlatList
                data={cats}
                renderItem={({ item }) => (
                    <RenderItem
                        title={item.name}
                        description={`${TXT.LABEL_AGE} ${unix2WordDiff(item.born_at)}`}
                    />
                )}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                numColumns={1}
                keyExtractor={item => item.id}
                ListHeaderComponent={() => (
                    <Header
                        mainTitle={mainTitle}
                        secondaryTitle={secondaryTitle}>
                        <OwnerCard
                            firstName={firstName}
                            lastName={lastName}
                            isFavorite={isFavorite}
                            favoriteIconOnPress={favoriteIconOnPress}
                        />
                    </Header>
                )}
                ItemSeparatorComponent={() => <VacuumSpace height={8} />}
                ListFooterComponent={() => <VacuumSpace height={24} />}
                ListEmptyComponent={<Wrapper><NoDataDisplay message={TXT.LABEL_NO_CAT} /></Wrapper>}
            />
            <View style={styles.stickyButtonContainer}>
                <Wrapper style={styles.stickyButtonWrapper}>
                    <Button onPress={buttonMasterOnPress}>{TXT.LABEL_MAKE_MASTER}</Button>
                </Wrapper>
            </View>
        </Fragment >
    )
}

interface RenderItemProps {
    title: string
    description: string
}
const RenderItem = memo<RenderItemProps>((props) => {
    let { title, description } = props
    return (
        <Wrapper>
            <PetListCard
                title={title}
                description={description}
            />
        </Wrapper>
    )
})

const styles = StyleSheet.create({
    stickyButtonContainer: {
        paddingBottom: 50,
        paddingTop: 8
    },
    stickyButtonWrapper: {
        marginHorizontal: 54
    },
    headerWrapper: {
        paddingTop: 24,
        marginBottom: 8
    },
    mb4: {
        marginBottom: 16
    },
    mt6: {
        marginTop: 24,
    }
})

export type { OwnerDetailProps }
export default OwnerDetail