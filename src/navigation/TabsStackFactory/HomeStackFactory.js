import Home from '../../screens/Tabs/Home';
import {Image} from 'react-native';
import MessageLink from '../../components/MessageLink';
import NavIcon from '../../components/NavIcon';
import React from 'react';
import {createNavigatorFactory} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {stackStyles} from '../config';
import styles from '../../utils/styles';
import {userDetailOption} from './options';
import Detail from '../../screens/Detail';

import UserDetail from '../../screens/UserDetail';
// import {StackFactory} from '../TabNavigation'
const Stack = createStackNavigator();

// TODO: 이 짓을 stackFactory마다 안해줄 수 없어?
const HomeStackFactory = ({navigation}) => (
  <Stack.Navigator
    initialRouteName={'Home'}
    screenOptions={{
      headerTitle: 'Home',
      headerStyle: {...stackStyles},
    }}>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        headerRight: () => <MessageLink />,
        headerTitle: <NavIcon name={'logo-instagram'} size={36} />,
      }}
    />
    <Stack.Screen name="Detail" component={Detail} />
    <Stack.Screen
      name="UserDetail"
      component={UserDetail}
      options={userDetailOption}
    />
  </Stack.Navigator>
);

export default HomeStackFactory;
