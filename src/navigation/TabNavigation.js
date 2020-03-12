import Home from '../screens/Tabs/Home';
import Notifications from '../screens/Tabs/Notifications';
import Profile from '../screens/Tabs/Profile';
import React from 'react';
import Search from '../screens/Tabs/Search';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabNavigation = ({navigation}) => (
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
        tabPress: e => {
          e.preventDefault(); // 이렇게 막은 다음에
          navigation.navigate('PhotoNavigation'); // navigate 한다!
        },
      }}
    />
    <Tab.Screen name="Notifications" component={Notifications} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

// fake tab, 이거 누르면 아예 다른 navigator로 가야해

export default TabNavigation;
