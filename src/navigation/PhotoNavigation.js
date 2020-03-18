import React from 'react';
import SelectPhoto from '../screens/Photo/SelectPhoto';
import TakePhoto from '../screens/Photo/TakePhoto';
import UploadPhoto from '../screens/Photo/UploadPhoto';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {stackStyles} from './config';
import styles from '../utils/styles';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const PhotoTabs = () => (
  <Tab.Navigator
    initialRouteName="TakePhoto"
    tabBarPosition={'bottom'}
    tabBarOptions={{
      indicatorStyle: {
        backgroundColor: styles.black,
        marginBottom: 20,
      },
      labelStyle: {
        color: styles.black,
        fontWeight: '600',
      },
      style: {
        ...stackStyles,
        paddingBottom: 20,
      },
    }}>
    <Tab.Screen
      name="SelectPhoto"
      component={SelectPhoto}
      options={{
        tabBarLabel: 'Select',
      }}
    />
    <Tab.Screen
      name="TakePhoto"
      component={TakePhoto}
      options={{
        tabBarLabel: 'Take',
      }}
    />
  </Tab.Navigator>
);

const PhotoNavigation = () => (
  <Stack.Navigator screenOptions={{headerStyle: {...stackStyles}}}>
    <Stack.Screen
      name="PhotoTabs"
      component={PhotoTabs}
      options={{
        // headerShown: false,
        headerTitle: 'Choose Photo',
      }}
    />
    <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
  </Stack.Navigator>
);

export default PhotoNavigation;
