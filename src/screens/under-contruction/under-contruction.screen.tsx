import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native'
import { Text } from '$components/molecules'
import { Wrapper, Container } from '$components/templates';
import { TXT } from '$strings/text'

type UnderConstructionProps = {}

const UnderConstruction: FC<UnderConstructionProps> = (props) => {
    return (
        <Container>
            <Wrapper>
                <View style={styles.wrapper}>
                    <Text>{TXT.LABEL_UNDER_CONTRUCTION}</Text>
                </View>
            </Wrapper>
        </Container >)
}

const styles = StyleSheet.create({
    wrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})

export type { UnderConstructionProps }
export default UnderConstruction