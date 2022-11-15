import React, { FC, Fragment } from 'react';
import { StyleSheet } from 'react-native'
import { Text } from '$components/molecules'
import { TXT } from '$strings/text'

type TitleWithLabelProps = {
    label: string,
    title: string
}

const TitleWithLabel: FC<TitleWithLabelProps> = (props) => {
    let { label, title } = props
    return (
        <Fragment>
            <Text
                size={TXT.SIZE_XS}
                color={TXT.COLOR_TYPE_GRAY}
                style={styles.defaultStyle}
            >
                {label}
            </Text>
            <Text
                style={[styles.mt0_5, styles.defaultStyle]}
            >
                {title}
            </Text>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    defaultStyle: {
        lineHeight: 22
    },
    mt0_5: {
        marginTop: 2,
    }
})

export type { TitleWithLabelProps }
export default TitleWithLabel