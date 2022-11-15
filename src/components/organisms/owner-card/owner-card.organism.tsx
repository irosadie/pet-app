import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native'
import { Card, IconStarFilled } from '$components/atomics'
import { Avatar, ListStuff, TitleWithLabel } from '$components/molecules'
import { TXT } from '$strings/text'

type OwnerCardProps = {
    firstName: string,
    lastName?: string,
    isFavorite?: boolean | number,
    favoriteIconOnPress: () => void,
}

const OwnerCard: FC<OwnerCardProps> = (props) => {
    let { firstName, lastName, isFavorite, favoriteIconOnPress } = props
    return (
        <Card>
            <View style={styles.cardWrapper}>
                <View>
                    <Avatar
                        size={TXT.SIZE_LARGE}
                        type={TXT.COLOR_TYPE_GRAY}
                        alt={lastName ? `${firstName} ${lastName}` : firstName}
                    />
                </View>
                <View style={styles.userInfoWrapper}>
                    <View>
                        <TitleWithLabel label={TXT.LABEL_FIST_NAME} title={firstName} />
                    </View>
                    <View style={styles.mt2_5}>
                        <TitleWithLabel label={TXT.LABEL_LAST_NAME} title={lastName ?? firstName} />
                    </View>
                </View>
                <View>
                    <ListStuff rightIcon={false} leftIcon={isFavorite ? <IconStarFilled /> : true} leftIconOnPress={favoriteIconOnPress} />
                </View>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    cardWrapper: {
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    userInfoWrapper: {
        flex: 1,
        paddingLeft: 42,
        paddingRight: 16
    },
    mt2_5: {
        marginTop: 10
    }
})

export type { OwnerCardProps }
export default OwnerCard