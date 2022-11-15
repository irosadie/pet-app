import React, { FC } from 'react';
import { Image, ImageProps, View } from 'react-native';

interface IconNarrowProps extends ImageProps { };

const IconNarrow: FC<IconNarrowProps> = (props) => {
    const NARROW = require('$assets/icons/narrow-right.png')
    return (
        <Image source={NARROW} {...props} />
    );
}

export default IconNarrow;