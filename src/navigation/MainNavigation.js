import PhotoNavigation from './PhotoNavigation';
import React from 'react';
import TabNavigation from './TabNavigation';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const MainNavigation = () => (
  <Stack.Navigator
    initialRouteName="TabNavigation"
    mode={'modal'} // only iOS
    headerMode={'none'}>
    <Stack.Screen name="TabNavigation" component={TabNavigation} />
    <Stack.Screen name="PhotoNavigation" component={PhotoNavigation} />
  </Stack.Navigator>
);

export default MainNavigation;
