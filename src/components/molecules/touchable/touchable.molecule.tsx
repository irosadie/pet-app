import { FC, ReactNode } from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import { Title } from '$components/molecules';
import { CLR } from '$strings/color'

interface TouchableProps extends TouchableOpacityProps {
    children: string | ReactNode,
}
const Touchable: FC<TouchableProps> = (props) => {
    let { children } = props
    if (typeof children === 'string') {
        children = <Title style={styles.colorBlackSpiring}>{children}</Title>
    }
    return (<TouchableOpacity activeOpacity={0.5} {...props}>{children}</TouchableOpacity>)
}

const styles = StyleSheet.create({
    colorBlackSpiring: {
        color: CLR.BLACK_SPIRING
    }
})

export type { TouchableProps }
export default Touchable

