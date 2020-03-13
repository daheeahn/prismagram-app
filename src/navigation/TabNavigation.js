import {Platform, Text, View} from 'react-native';

import HomeStackFactory from './TabsStackFactory/HomeStackFactory';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavIcon from '../components/NavIcon';
import NotiStackFactory from './TabsStackFactory/NotiStackFactory';
import ProfileStackFactory from './TabsStackFactory/ProfileStackFactory';
import React from 'react';
import SearchStackFactory from './TabsStackFactory/SearchStackFactory';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// TODO: 이렇게 일반화 시킬 수 없는거야?
// const stackFactory = (initialRouteName, component) => {
//   console.log(initialRouteName, component);
//   return (
//     <Stack.Navigator initialRouteName={initialRouteName}>
//       <Stack.Screen
//         name={initialRouteName} // TODO: ok?
//         component={component}
//         // options={{...customConfig}}
//       />
//     </Stack.Navigator>
//   );
// };

const TabNavigation = ({navigation}) => (
  <Tab.Navigator
    initialRouteName="HomeStackFactory"
    headerMode={'none'}
    tabBarOptions={{
      showLabel: false,
    }}>
    <Tab.Screen
      name="HomeStackFactory"
      component={HomeStackFactory}
      options={{
        tabBarIcon: () => (
          <NavIcon name={Platform === 'android' ? 'md-home' : 'ios-home'} />
        ),
      }}
    />
    <Tab.Screen
      name="SearchStackFactory"
      component={SearchStackFactory}
      options={{
        tabBarIcon: () => (
          <NavIcon name={Platform === 'android' ? 'md-search' : 'ios-search'} />
        ),
      }}
    />
    <Tab.Screen
      name="Add"
      component={View}
      options={{
        tabBarIcon: () => (
          <NavIcon name={Platform === 'android' ? 'md-add' : 'ios-add'} />
        ),
      }}
      listeners={{
        tabPress: e => {
          e.preventDefault(); // 이렇게 막은 다음에
          navigation.navigate('PhotoNavigation'); // navigate 한다!
        },
      }}
    />
    <Tab.Screen
      name="NotiStackFactory"
      component={NotiStackFactory}
      options={{
        tabBarIcon: () => (
          <NavIcon name={Platform === 'android' ? 'md-heart' : 'ios-heart'} />
        ),
      }}
    />
    <Tab.Screen
      name="ProfileStackFactory"
      component={ProfileStackFactory}
      options={{
        tabBarIcon: () => (
          <NavIcon name={Platform === 'android' ? 'md-person' : 'ios-person'} />
        ),
      }}
    />
  </Tab.Navigator>
);

// fake tab, 이거 누르면 아예 다른 navigator로 가야해

export default TabNavigation;
