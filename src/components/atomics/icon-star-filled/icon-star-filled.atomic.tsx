import React, { FC } from 'react';
import { Image, ImageProps, View } from 'react-native';

interface IconStarFilledProps extends ImageProps { };


const IconStarFilled: FC<IconStarFilledProps> = (props) => {
    const STAR_FILLED = require('$assets/icons/star-filled.png');
    return (
        <Image source={STAR_FILLED} {...props} />
    );
}

export default IconStarFilled;