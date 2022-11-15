import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

interface WrapperProps extends ViewProps {
  children: React.ReactNode;
};

const Wrapper: React.FC<WrapperProps> = (props): React.ReactElement => {
  return (
    <View style={styles.wrapper} {...props}>
      {props.children}
    </View>
  );
};

Wrapper.defaultProps = {};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 24
  }
})

export type { WrapperProps }
export default Wrapper;
