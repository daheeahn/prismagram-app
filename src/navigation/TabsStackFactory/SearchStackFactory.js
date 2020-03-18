import React from 'react';
import Search from '../../screens/Tabs/Search';
import {createStackNavigator} from '@react-navigation/stack';
import {stackStyles} from '../config';
import Detail from '../../screens/Detail';
import UserDetail from '../../screens/UserDetail';
import styles from '../../utils/styles';

const Stack = createStackNavigator();

// TODO: 이 짓을 stackFactory마다 안해줄 수 없어?
const SearchStackFactory = () => (
  <Stack.Navigator
    initialRouteName={'Search'}
    screenOptions={{
      headerStyle: {...stackStyles},
      headerBackTitle: ' ',
    }}>
    <Stack.Screen name="Search" component={Search} />
    <Stack.Screen
      name="Detail"
      component={Detail}
      options={{headerTintColor: styles.black, headerTitle: 'Post'}}
    />
    <Stack.Screen
      name="UserDetail"
      component={UserDetail}
      options={{
        headerTitle: 'User',
        headerBackTitle: ' ',
        headerTintColor: styles.black,
      }}
    />
  </Stack.Navigator>
);

export default SearchStackFactory;
