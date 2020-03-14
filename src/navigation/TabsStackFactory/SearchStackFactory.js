import React from 'react';
import Search from '../../screens/Tabs/Search';
import {createStackNavigator} from '@react-navigation/stack';
import {stackStyles} from '../config';

const Stack = createStackNavigator();

// TODO: 이 짓을 stackFactory마다 안해줄 수 없어?
const SearchStackFactory = () => (
  <Stack.Navigator
    initialRouteName={'Search'}
    screenOptions={{headerTitle: 'Search', headerStyle: {...stackStyles}}}>
    <Stack.Screen name="Search" component={Search} />
  </Stack.Navigator>
);

export default SearchStackFactory;
