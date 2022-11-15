import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native'

type VacuumSpaceProps = {
    height?: number
}

const VacuumSpace: FC<VacuumSpaceProps> = ({ height }) => <View style={styles(height ?? 0).vacuumHeight} />

VacuumSpace.defaultProps = {
    height: 16
}

const styles = (height: number) => StyleSheet.create({
    vacuumHeight: {
        height: height
    }
})
export type { VacuumSpaceProps }
export default VacuumSpace