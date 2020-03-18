import {Platform, View} from 'react-native';

import NavIcon from '../components/NavIcon';
import HomeStackFactory from './TabsStackFactory/HomeStackFactory';
import NotiStackFactory from './TabsStackFactory/NotiStackFactory';
import ProfileStackFactory from './TabsStackFactory/ProfileStackFactory';
import React from 'react';
import SearchStackFactory from './TabsStackFactory/SearchStackFactory';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import styles from '../utils/styles';

const Tab = createBottomTabNavigator();

const TabNavigation = ({navigation}) => (
  <Tab.Navigator
    initialRouteName="HomeStackFactory"
    headerMode={'none'}
    tabBarOptions={{
      showLabel: false,
      style: {
        // tabBarStyle로 하면 탭 부분만 스타일이 바뀌고 그 아래는 적용이 안됨. 휴대폰 맨 끝 부분.
        backgroundColor: styles.instaColor,
      },
    }}>
    <Tab.Screen
      name="HomeStackFactory"
      component={HomeStackFactory}
      options={{
        tabBarIcon: ({focused}) => (
          <NavIcon
            focused={focused}
            name={Platform === 'android' ? 'md-home' : 'ios-home'}
          />
        ),
      }}
    />
    <Tab.Screen
      name="SearchStackFactory"
      component={SearchStackFactory}
      options={{
        tabBarIcon: ({focused}) => (
          <NavIcon
            focused={focused}
            name={Platform === 'android' ? 'md-search' : 'ios-search'}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Add"
      component={View}
      options={{
        tabBarIcon: ({focused}) => (
          <NavIcon
            focused={focused}
            size={30}
            name={Platform === 'android' ? 'md-add' : 'ios-add'}
          />
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
        tabBarIcon: ({focused}) => (
          <NavIcon
            focused={focused}
            name={Platform === 'android' ? 'md-heart' : 'ios-heart'}
          />
        ),
      }}
    />
    <Tab.Screen
      name="ProfileStackFactory"
      component={ProfileStackFactory}
      options={{
        tabBarIcon: ({focused}) => (
          <NavIcon
            focused={focused}
            name={Platform === 'android' ? 'md-person' : 'ios-person'}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

// fake tab, 이거 누르면 아예 다른 navigator로 가야해

export default TabNavigation;
