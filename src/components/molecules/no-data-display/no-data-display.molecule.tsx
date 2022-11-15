
import { FC } from 'react';
import { View, StyleSheet } from 'react-native'
import { CatShow } from '$components/atomics'
import { Text } from '$components/molecules'
import { TXT } from '$strings/text'

type NoDataDisplayProps = {
    message: string
}
const NoDataDisplay: FC<NoDataDisplayProps> = (props) => {
    let { message } = props
    return (
        <View style={[styles.wrapper, styles.mt4]}>
            <CatShow />
            <View style={styles.mt4}>
                <Text color={TXT.COLOR_TYPE_GRAY} size={TXT.SIZE_BASE} fontFamily={TXT.FONT_CS_BOLD}>{message}</Text>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    wrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    mt4: { marginTop: 16 }
})

export type { NoDataDisplayProps }
export default NoDataDisplay