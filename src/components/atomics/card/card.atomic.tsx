import React, { FC } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native'
import { CLR } from '$strings/color'

interface CardProps extends ViewProps { }
const Card: FC<CardProps> = (props) => {
    let { children } = props
    return (<View style={styles.card}>{children}</View>)
}

const styles = StyleSheet.create({
    card: {
        paddingVertical: 12,
        backgroundColor: CLR.WHITE,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: CLR.CARD_BORDER,
        paddingHorizontal: 16,
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

export type { CardProps }
export default Card