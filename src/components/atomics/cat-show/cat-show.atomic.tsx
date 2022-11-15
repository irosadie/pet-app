
import { FC } from 'react';
import { Image, ImageProps } from 'react-native'

interface CatShowProps extends ImageProps { }

const CatShow: FC<CatShowProps> = (props) => {
    return <Image source={require('$assets/images/cat.png')} {...props} />
}

export type { CatShowProps }
export default CatShow