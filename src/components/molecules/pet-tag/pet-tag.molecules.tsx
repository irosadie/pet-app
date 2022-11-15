import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '$components/molecules'
import { TXT } from '$strings/text'

type PetTagProps = {
    title: string,
    description: string
}

const PetTag: FC<PetTagProps> = (props) => {
    let { title, description } = props
    return (
        <View style={styles.mv1_5}>
            <View>
                <Text fontFamily={TXT.FONT_CS_BOLD} style={styles.lineHeightTitle}>{title}</Text>
            </View>
            <View style={styles.mt2}>
                <Text color={TXT.COLOR_TYPE_GRAY} size={TXT.SIZE_XS} style={styles.lineHeightDesc}>{description}</Text>
            </View>
        </View>
    )
}

PetTag.defaultProps = {}

const styles = StyleSheet.create({
    mv1_5: { marginVertical: 6 },
    mt2: { marginTop: 8 },
    lineHeightTitle: { lineHeight: 22, fontWeight: '700' },
    lineHeightDesc: { lineHeight: 15, letterSpacing: 0.02 },
})

export type { PetTagProps }
export default PetTag;
