import { FC, Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextProps, Avatar, AvatarProps } from '$components/molecules'
import { TXT } from '$strings/text'

type OwnerTagProps = {
    children?: string,
    title?: string,
    titleProps?: TextProps,
    avatarType?: AvatarProps["type"],
    avatarAlt?: string,
}

const OwnerTag: FC<OwnerTagProps> = (props) => {
    let { children, title, avatarType, titleProps, avatarAlt } = props

    let isMedium = false
    if (titleProps?.fontFamily === TXT.FONT_CS_MEDIUM) {
        isMedium = true
    }
    return (
        <Fragment>
            <View style={styles.tagWrapper}>
                <Avatar
                    type={avatarType}
                    alt={avatarAlt ?? children ?? title}
                />
                <View style={styles.ml4}>
                    <Text {...titleProps} style={[isMedium ? styles.mediumStyle : styles.normalStyle]}>{children ?? title}</Text>
                </View>
            </View>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    ml4: { marginLeft: 16 },
    mediumStyle: {
        letterSpacing: 0.02,
        lineHeight: 18
    },
    normalStyle: {
        letterSpacing: 0,
        lineHeight: 20
    },
    tagWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export type { OwnerTagProps }
export default OwnerTag