import React, { FC } from 'react';
import { StyleSheet } from 'react-native'
import { Button as ButtonAtomic, ButtonProps as ButtonPropsAtomic } from '$components/atomics'
import { Text } from '$components/molecules'
import { TXT } from '$strings/text'
import { CLR } from '$strings/color'


interface ButtonProps extends Omit<ButtonPropsAtomic, "children"> {
    title?: string,
    children?: string
}

// the button have no variant
const Button: FC<ButtonProps> = (props) => {
    let { children, title } = props
    return (
        <ButtonAtomic {...props}>
            <Text
                size={TXT.SIZE_LG}
                fontFamily={TXT.FONT_CS_MEDIUM}
                style={styles.buttonTextStyle}>
                {children ?? title}
            </Text>
        </ButtonAtomic>
    )
}

const styles = StyleSheet.create({
    buttonTextStyle: {
        color: CLR.BUTTON_TEXT,
        lineHeight: 26
    }
})

export type { ButtonProps }
export default Button