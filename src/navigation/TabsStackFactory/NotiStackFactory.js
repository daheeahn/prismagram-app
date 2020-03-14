import Notifications from '../../screens/Tabs/Notifications';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {stackStyles} from '../config';

const Stack = createStackNavigator();

// TODO: 이 짓을 stackFactory마다 안해줄 수 없어?
const NotiStackFactory = () => (
  <Stack.Navigator
    initialRouteName={'Notifications'}
    screenOptions={{
      headerTitle: 'Notifications',
      headerStyle: {...stackStyles},
    }}>
    <Stack.Screen name="Notifications" component={Notifications} />
  </Stack.Navigator>
);

export default NotiStackFactory;
