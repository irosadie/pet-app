import { FC, Fragment } from 'react';
import { ImageProps, StyleSheet } from 'react-native';
import { Avatar as AvatarAtom } from '$components/atomics'
import { TextProps } from '$components/molecules'
import { alias2Init } from '$utils/index'
import { TXT } from '$strings/text'
import { CLR } from '$strings/color'

interface AvatarProps extends ImageProps {
    alt?: string
    size?: 'normal' | 'large',
    type?: 'primary' | 'gray',
    source?: ImageProps["source"]
}

const Avatar: FC<AvatarProps> = (props) => {
    let { size, source, alt, type, style } = props;
    let alias = ""; let isSize; let isType; let isTextProps: Partial<TextProps> = {};

    switch (type) {
        case TXT.COLOR_TYPE_GRAY:
            isType = typeStyle.gray
            isTextProps = {
                color: TXT.COLOR_TYPE_WHITE,
                ...isTextProps
            }
            break;
        default: break;
    }

    switch (size) {
        case TXT.SIZE_LARGE:
            isSize = sizeStyle.large
            isTextProps = {
                size: TXT.SIZE_XL,
                ...isTextProps
            }
            break;
        default: break;
    }
    if (!source && alt) {
        alias = alias2Init(alt)
    }
    return (
        <Fragment>
            <AvatarAtom {...props} textProps={isTextProps} style={[isSize, isType, style]} alias={alias} />
        </Fragment>
    )
}

Avatar.defaultProps = {
    type: TXT.COLOR_TYPE_PRIMARY,
    alt: TXT.DEFAULT_AVATAR_STR,
    size: TXT.SIZE_NORMAL
}

const typeStyle = StyleSheet.create({
    gray: {
        backgroundColor: CLR.BG_GRAY,
        border: 1.35,
        borderColor: CLR.BORDER_GRAY
    }
})

const sizeStyle = StyleSheet.create({
    large: {
        width: 56,
        height: 56
    }
})

export type { AvatarProps }
export default Avatar