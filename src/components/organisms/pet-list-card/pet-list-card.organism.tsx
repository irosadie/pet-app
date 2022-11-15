import React, { FC } from 'react';
import { View, TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import { Card } from '$components/atomics'
import { ListStuff, PetTag } from '$components/molecules'

interface OwnerListCardProps extends TouchableOpacityProps {
    title: string;
    description: string;
};

const OwnerListCard: FC<OwnerListCardProps> = (props) => {
    let { title, description } = props;
    return (
        <TouchableOpacity activeOpacity={0.85} {...props}>
            <Card>
                <View style={styles.cardWrapper}>
                    <PetTag title={title} description={description} />
                    <ListStuff />
                </View>
            </Card>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})

export default OwnerListCard;
