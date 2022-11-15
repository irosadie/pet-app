import React, { FC } from 'react';
import { Image, ImageProps } from 'react-native';

interface IconRectangleProps extends ImageProps { };

const IconRectangle: FC<IconRectangleProps> = (props) => {
    const RECTANGLE = require('$assets/icons/rectangle.png');
    return (
        <Image source={RECTANGLE} {...props} />
    );
}

export default IconRectangle;