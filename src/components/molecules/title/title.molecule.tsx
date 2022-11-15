import React, { FC, Fragment } from 'react';
import { Text, TextProps } from '$components/molecules'
import { TXT } from '$strings/text'

interface TitleProps extends TextProps {
    children: string
}
const Title: FC<TitleProps> = ({ children, style }, props) => (<Fragment><Text color={TXT.COLOR_TYPE_GRAY} {...props} style={[style]}>{children}</Text></Fragment>)

export type { TitleProps }
export default Title