import { FC, Fragment, ReactNode } from 'react';
import { Image, ImageProps, View, StyleSheet } from 'react-native';
import { Text, TextProps } from '$components/index'
import { TXT } from '$strings/text'
import { CLR } from '$strings/color'

export interface AvatarProps extends ImageProps {
    source?: ImageProps["source"]
    alias?: ReactNode,
    textProps?: TextProps
}

const Avatar: FC<AvatarProps> = (props) => {
    let { source, alias, style, textProps } = props;
    if (source) {
        return (
            <Fragment>
                <Image {...props} source={source} style={[styles.avatar, style]} />
            </Fragment>
        )
    }
    return (
        <View {...props} style={[styles.avatar, style]}>
            <Text
                color={TXT.COLOR_TYPE_PRIMARY}
                fontFamily={TXT.FONT_SP_SEMIBOLD}
                size={TXT.SIZE_BASE}
                {...textProps}
            >{alias}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        minHeight: 40,
        minWidth: 40,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: CLR.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center'
    },

})

Avatar.defaultProps = {}

export default Avatar