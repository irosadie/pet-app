import React, { FC } from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { TXT } from '$strings/text'
import { CLR } from '$strings/color'

interface TextAtomicProps extends TextProps { };

const TextAtomic: FC<TextAtomicProps> = (props) => {
    let { children, style } = props;
    return <Text  {...props} style={[styles.textDefault, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
    textDefault: {
        fontFamily: TXT.FONT_CS_NORMAL,
        color: CLR.DEFAULT,
        lineHeight: 20,
        fontSize: 12,
        fontWeight: '500'
    }
})

export type { TextAtomicProps }
export default TextAtomic;