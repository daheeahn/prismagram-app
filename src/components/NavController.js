import AuthNavigation from '../navigation/AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import TabNavigation from '../navigation/TabNavigation';
import {createStackNavigator} from '@react-navigation/stack';
import {useIsLoggedIn} from '../context/AuthContext';

const Stack = createStackNavigator();

// const screenOpts = {
//   headerShown: false,
// };

export default () => {
  // const isLoggedIn = useIsLoggedIn();
  const isLoggedIn = true;
  // 전체 어플리케이션 빌드하고 필요할 때마다 쓰는거야. 컴포넌트화 할 예정.

  return (
    <NavigationContainer>
      {isLoggedIn ? <TabNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};
