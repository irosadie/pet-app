import { FC, ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'
import { IconRectangle } from '$components/atomics'
import {
    Title,
    HeaderTitle,
    HeaderTitleProps,
    Touchable
} from '$components/molecules'
import { CLR } from '$strings/color'

interface HeaderTitleOwnerProps extends HeaderTitleProps {
    touchableTitle: string,
    subtitle: string
    rectangle?: boolean,
    filterOnPress: () => void,
}

const HeaderTitleOwner: FC<HeaderTitleOwnerProps> = (props) => {
    let { title, subtitle, touchableTitle, rectangle, filterOnPress } = props
    let touchableChildren: string | ReactNode = touchableTitle
    if (rectangle) {
        touchableChildren = (
            <View style={styles.childrenWrapper}>
                <View>
                    <Title style={styles.colorBlackSpiring}>{touchableTitle}</Title>
                </View>
                <View style={styles.ml2}>
                    <IconRectangle />
                </View>
            </View>
        )
    }
    return (<HeaderTitle
        title={title}
        subtitle={(<View style={styles.flexRow}>
            <Title>{subtitle}</Title>
            <Touchable onPress={filterOnPress}>{touchableChildren}</Touchable>
        </View>)}
    />
    )
}

const styles = StyleSheet.create({
    childrenWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    ml2: {
        marginLeft: 8
    },
    colorBlackSpiring: {
        color: CLR.BLACK_SPIRING
    },
    flexRow: {
        flexDirection: 'row'
    }
})

export type { HeaderTitleOwnerProps }
export default HeaderTitleOwner

