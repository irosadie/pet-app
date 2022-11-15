import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux'
import moment from 'moment'
import { CLR } from '$strings/color'
import { store } from '$stores/index'
import { MainNavigation } from '$navigations/index';
import Toast from 'react-native-toast-message';

moment.locale('en');

const App = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <StatusBar barStyle={'dark-content'} backgroundColor={CLR.BG_MAIN} />
        <MainNavigation />
        <Toast />
      </Provider>
    </Fragment>
  );
};

export default App;
