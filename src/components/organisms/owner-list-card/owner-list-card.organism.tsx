import { FC, Fragment } from 'react';
import { View, TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import { Card, IconStarFilled } from '$components/atomics'
import { ListStuff, OwnerTag } from '$components/molecules'
import { TXT } from '$strings/text'

interface OwnerListCardProps extends TouchableOpacityProps {
    title: string,
    isFavorite: boolean,
    favoriteIconOnPress: () => void,
    onPress: () => void
};

const OwnerListCard: FC<OwnerListCardProps> = (props) => {
    let { title, isFavorite, favoriteIconOnPress, onPress } = props
    return (
        <Fragment>
            <TouchableOpacity activeOpacity={0.85} {...props}>
                <Card>
                    <View style={styles.cardWrapper}>
                        <OwnerTag
                            avatarType={TXT.COLOR_TYPE_GRAY}
                            title={title}
                        />
                        <ListStuff
                            leftIcon={isFavorite ? <IconStarFilled /> : true}
                            leftIconOnPress={favoriteIconOnPress}
                            rightIconOnPress={onPress}
                        />
                    </View>
                </Card>
            </TouchableOpacity>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    cardWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default OwnerListCard;
