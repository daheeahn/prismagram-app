import Home from '../screens/Home';
import Notifications from '../screens/Notifications';
import Profile from '../screens/Profile';
import React from 'react';
import Search from '../screens/Search';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabNavigation = () => (
  <Tab.Navigator initialRouteName="Home" headerMode={'none'}>
    <Tab.Screen
      name="Home"
      component={Home}
      //   options={{
      //     title: 'hi',
      //   }}
    />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen
      name="Add"
      component={View}
      listeners={{
        tabPress: () => {
          console.log('hi');
        },
      }}
    />
    <Tab.Screen name="Notifications" component={Notifications} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

// fake tab, 이거 누르면 아예 다른 navigator로 가야해

export default TabNavigation;
