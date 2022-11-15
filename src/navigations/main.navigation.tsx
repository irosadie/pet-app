import React, { FC, Fragment, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from 'react-native-splash-screen'
import Spinner from 'react-native-loading-spinner-overlay';
import { OwnerList, OwnerDetail, UnderConstruction } from '$screens/index'
import { OwnerTag } from '$components/molecules'
import { CLR } from '$strings/color'
import { TXT } from '$strings/text'
import { useAppSelector } from '$stores/index'

const Stack = createNativeStackNavigator<MainNavigation>()

const MainNavigation: FC = () => {

  let master = useAppSelector((state) => state.master)
  let loading = useAppSelector((state) => state.loading)

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <Fragment>
      <Spinner
        visible={loading}
      />
      <NavigationContainer>
        <Stack.Navigator
          id={TXT.NAV_ID}
          initialRouteName={'OwnerList'}
        >
          <Stack.Group
            screenOptions={{
              headerShown: true,
              headerShadowVisible: false,
              headerTransparent: false,
              headerStyle: { backgroundColor: CLR.BG_MAIN },
              headerRight: () => {
                return null
              },
              headerTitle: () => <OwnerTag
                avatarAlt={`${master.name ?? "!"}`}
                titleProps={{ size: TXT.SIZE_BASE, fontFamily: TXT.FONT_CS_MEDIUM }}
                title={`${TXT.LABEL_MASTER}: ${master.name ?? TXT.LABEL_UNSET}`} />,
              headerTitleAlign: 'center'
            }}
          >
            <Stack.Screen
              key={TXT.NAV_OWNER_LIST_KEY}
              name="OwnerList"
              component={OwnerList}
            />
            <Stack.Screen
              key={TXT.NAV_OWNER_DETAIL_KEY}
              name="OwnerDetail"
              component={OwnerDetail}
            />
            <Stack.Screen
              key={TXT.NAV_UNDER_CONTRUCTION_KEY}
              name="UnderConstruction"
              component={UnderConstruction}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen
              key={'_catch_error'}
              name="CatchError"
              component={UnderConstruction} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer >
    </Fragment>
  )
}

export default MainNavigation
