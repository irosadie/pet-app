import { FC, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from '$components/molecules';
import { CLR } from '$strings/color'

type HeaderTitleProps = {
    title: string,
    subtitle?: ReactNode
}

const HeaderTitle: FC<HeaderTitleProps> = (props) => {
    let { title, subtitle } = props;

    return (
        <View style={styles.headerTitleWrap}>
            <View style={styles.flex}>
                <Title>{title}</Title>
            </View>
            {subtitle ? subtitle : null}
        </View >
    )
}

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    headerTitleWrap: {
        backgroundColor: CLR.BG_MAIN,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export type { HeaderTitleProps }
export default HeaderTitle