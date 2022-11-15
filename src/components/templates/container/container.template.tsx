import React, { FC, useEffect, ReactNode } from 'react';
import {
  View,
  ScrollView,
  ScrollViewProps,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  ViewProps,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { useAppSelector } from '$stores/index'
import { CLR } from '$strings/color'

type ContainerProps = {
  children: ReactNode;
  scrollView?: boolean;
  scrollViewProps?: ScrollViewProps;
  scrollViewStyle?: ScrollViewProps["style"];
  keyboardAvoidingView?: boolean;
  keyboardAvoidingViewProps?: KeyboardAvoidingViewProps;
  keyboardAvoidingViewStyle?: KeyboardAvoidingViewProps["style"];
  loading?: boolean
} & ViewProps;

const Container: FC<ContainerProps> = (
  props,
) => {
  let {
    children,
    scrollView,
    keyboardAvoidingView,
    keyboardAvoidingViewProps,
    scrollViewProps,
    scrollViewStyle,
    keyboardAvoidingViewStyle,
    loading
  } = props;

  const navigation = useNavigation<any>();
  const errorHandler = useAppSelector((state) => state.errorHandler)

  useEffect(() => {
    if (errorHandler?.type) {
      navigation.navigate("CatchError",
        {
          type: errorHandler.type,
          message: errorHandler.message
        }
      );
    }
  }, [errorHandler])

  if (keyboardAvoidingView) {
    children = (<KeyboardAvoidingView
      {...keyboardAvoidingViewProps}
      style={[styles.flex, keyboardAvoidingViewStyle]}
      keyboardVerticalOffset={50}
    ><TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback></KeyboardAvoidingView>)
  }
  if (scrollView) {
    children = (<ScrollView {...scrollViewProps} contentContainerStyle={[styles.flexGrow, scrollViewProps?.contentContainerStyle]} style={[styles.flex, scrollViewStyle]} >{children}</ScrollView>)
  }

  if (loading) {
    children = (<View style={styles.loadingWrap} >
      <Progress.CircleSnail
        size={42}
        indeterminate={true}
        color={[CLR.RED, CLR.BLUE, CLR.GREEN]}
        style={{
          alignSelf: "center",
        }} />
    </View >)
  }

  return (
    <SafeAreaView style={styles.flex}>
      <View {...props} style={[styles.flex, bgStyle().main]}>
        {children}
      </View>
    </SafeAreaView >
  )
};

Container.defaultProps = {
  scrollView: false,
  keyboardAvoidingView: false,
  loading: false
};

const bgStyle = (color?: string) => StyleSheet.create({
  main: {
    backgroundColor: color ?? CLR.BG_MAIN
  }
})

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  flexGrow: {
    flex: 1
  },
  loadingWrap: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})

export type { ContainerProps }
export default Container;
