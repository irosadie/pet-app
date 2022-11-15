import React, { FC, ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { CLR } from '$strings/color'

interface ButtonProps extends TouchableOpacityProps {
    children: ReactNode,
}

const Button: FC<ButtonProps> = (props) => {
    let { children, style } = props
    return (
        <TouchableOpacity activeOpacity={0.85} {...props} style={[styles.buttonWrapper, style]}>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonWrapper: {
        backgroundColor: CLR.PRIMARY,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 8,
        shadowColor: CLR.SHADOW_MAIN,
        shadowOffset: {
            width: 8,
            height: 8,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.25,
        elevation: 24
    }
})

export type { ButtonProps }
export default Button