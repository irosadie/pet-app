import React, { FC } from 'react';
import { StyleSheet } from 'react-native'
import { Text, TextProps } from '$components/atomics';
import { TXT } from '$strings/text'
import { CLR } from '$strings/color'

interface TextMoleculeProps extends TextProps {
    color?: 'white' | 'primary' | 'gray' | 'default';
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl',
    fontFamily?: 'Circular-Std-Normal' | 'Circular-Std-Medium' | 'Circular-Std-Bold' | 'SF-Pro-Text-Semibold',
};

const TextMolecule: FC<TextMoleculeProps> = (props) => {
    let { children, style, color, size, fontFamily } = props;
    let isColor; let isSize; let isFontFamily;
    switch (color) {
        case TXT.COLOR_TYPE_WHITE:
            isColor = colorStyle.white;
            break;
        case TXT.COLOR_TYPE_PRIMARY:
            isColor = colorStyle.primary;
            break;
        case TXT.COLOR_TYPE_GRAY:
            isColor = colorStyle.gray;
            break;
        default: break;
    }

    switch (size) {
        case TXT.SIZE_XS:
            isSize = sizeStyle.xs;
            break;
        case TXT.SIZE_SM:
            isSize = sizeStyle.sm;
            break;
        case TXT.SIZE_BASE:
            isSize = sizeStyle.base;
            break;
        case TXT.SIZE_LG:
            isSize = sizeStyle.lg;
            break;
        case TXT.SIZE_XL:
            isSize = sizeStyle.xl;
            break;
        default: break;
    }

    switch (fontFamily) {
        case TXT.FONT_SP_SEMIBOLD:
            isFontFamily = fontStyle.sfProText;
        case TXT.FONT_CS_MEDIUM:
            isFontFamily = fontStyle.circularStdMedium;
            break;
        case TXT.FONT_CS_BOLD:
            isFontFamily = fontStyle.circularStdBold;
            break;
        default: break;
    }

    return <Text {...props} style={[isColor, isSize, isFontFamily, style]} >{children}</Text>;
}

TextMolecule.defaultProps = {
    color: TXT.COLOR_TYPE_DEFAULT,
    size: TXT.SIZE_SM,
    fontFamily: TXT.FONT_CS_NORMAL
}

const colorStyle = StyleSheet.create({
    white: { color: CLR.WHITE },
    primary: { color: CLR.PRIMARY },
    gray: { color: CLR.GRAY }
})


const sizeStyle = StyleSheet.create({
    xs: { fontSize: 12, lineHeight: 16 },
    sm: { fontSize: 14, lineHeight: 20 },
    base: { fontSize: 16, lineHeight: 24 },
    lg: { fontSize: 18, lineHeight: 28 },
    xl: { fontSize: 20, lineHeight: 28 }

})

const fontStyle = StyleSheet.create({
    circularStdMedium: { fontFamily: TXT.FONT_CS_MEDIUM },
    circularStdBold: { fontFamily: TXT.FONT_CS_BOLD },
    sfProText: { fontFamily: TXT.FONT_SP_SEMIBOLD },
})

export type { TextMoleculeProps }
export default TextMolecule;