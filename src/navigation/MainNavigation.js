import MessageNavigation from './MessageNavigation';
import PhotoNavigation from './PhotoNavigation';
import React from 'react';
import TabNavigation from './TabNavigation';
import {createStackNavigator} from '@react-navigation/stack';
import {stackStyles} from './config';

const Stack = createStackNavigator();

const MainNavigation = () => (
  <Stack.Navigator
    initialRouteName="TabNavigation"
    mode={'modal'} // only iOS
    headerMode={'none'}
    screenOptions={{headerStyle: {...stackStyles}}}>
    <Stack.Screen name="TabNavigation" component={TabNavigation} />
    <Stack.Screen name="PhotoNavigation" component={PhotoNavigation} />
    <Stack.Screen name="MessageNavigation" component={MessageNavigation} />
  </Stack.Navigator>
);

export default MainNavigation;
