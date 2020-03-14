import React from 'react';
import SelectPhoto from '../screens/Photo/SelectPhoto';
import TakePhoto from '../screens/Photo/TakePhoto';
import UploadPhoto from '../screens/Photo/UploadPhoto';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {stackStyles} from './config';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const PhotoTabs = () => (
  <Tab.Navigator
    initialRouteName="TakePhoto"
    headerMode={'none'}
    tabBarPosition={'bottom'}>
    <Tab.Screen name="SelectPhoto" component={SelectPhoto} />
    <Tab.Screen name="TakePhoto" component={TakePhoto} />
  </Tab.Navigator>
);

const PhotoNavigation = () => (
  <Stack.Navigator screenOptions={{headerStyle: {...stackStyles}}}>
    <Stack.Screen name="PhotoTabs" component={PhotoTabs} />
    <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
  </Stack.Navigator>
);

export default PhotoNavigation;
