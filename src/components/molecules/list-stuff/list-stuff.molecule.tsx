import React, { FC, ReactNode } from 'react';
import { View, ViewProps, StyleSheet, TouchableOpacity } from 'react-native';
import { IconNarrow, IconStar } from '$components/atomics'

interface ListStuffProps extends ViewProps {
    leftIcon?: boolean | ReactNode;
    leftIconOnPress?: () => void;
    rightIcon?: boolean | ReactNode;
    rightIconOnPress?: () => void
}

const ListStuff: FC<ListStuffProps> = (props) => {
    let { leftIcon, rightIcon, leftIconOnPress, rightIconOnPress } = props;
    if (leftIcon && typeof leftIcon === 'boolean') {
        leftIcon = (<View style={styles.contentCenter}><IconStar /></View>)
    }
    if (rightIcon && typeof rightIcon === 'boolean') {
        rightIcon = (<View style={[styles.contentCenter]}><IconNarrow /></View>)
    }
    return (
        <View style={styles.listStuffWrap}>
            {leftIcon ? (
                <TouchableOpacity style={[styles.iconWrapper]} activeOpacity={0.85} onPress={leftIconOnPress}>
                    {leftIcon}
                </TouchableOpacity>
            ) : null}
            {rightIcon ? (
                <TouchableOpacity style={[styles.iconWrapper, styles.ml5]} activeOpacity={0.85} onPress={rightIconOnPress}>
                    {rightIcon}
                </TouchableOpacity>
            ) : null}
        </View>
    )
}

ListStuff.defaultProps = {
    rightIcon: true,
}


const styles = StyleSheet.create({
    ml5: {
        marginLeft: 4
    },
    contentCenter: {
        justifyContent: 'center'
    },
    listStuffWrap: {
        marginRight: 2,
        flexDirection: 'row',
    },
    iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 32,
        height: 32,
        borderRadius: 9999
    }
})

export type { ListStuffProps }
export default ListStuff;
