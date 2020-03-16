import Profile from '../../screens/Tabs/Profile';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {stackStyles} from '../config';
import Detail from '../../screens/Detail';

const Stack = createStackNavigator();

// TODO: 이 짓을 stackFactory마다 안해줄 수 없어?
const ProfileStackFactory = () => (
  <Stack.Navigator
    initialRouteName={'Profile'}
    screenOptions={{headerTitle: 'Profile', headerStyle: {...stackStyles}}}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Detail" component={Detail} />
  </Stack.Navigator>
);

export default ProfileStackFactory;
