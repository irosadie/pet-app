import React, { FC } from 'react';
import { Image, ImageProps } from 'react-native';

interface IconNarrowProps extends ImageProps { };

const IconStar: FC<IconNarrowProps> = (props) => {
    const STAR = require('$assets/icons/star.png');
    return (
        <Image source={STAR} {...props} />
    );
}

export default IconStar;