import {Text, TouchableOpacity} from 'react-native';

import Home from '../../screens/Tabs/Home';
import MessageLink from '../../components/MessageLink';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

// TODO: 이 짓을 stackFactory마다 안해줄 수 없어?
const HomeStackFactory = ({navigation}) => (
  <Stack.Navigator
    initialRouteName={'Home'}
    screenOptions={{headerTitle: 'Home'}}>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        headerRight: () => <MessageLink />,
      }}
    />
  </Stack.Navigator>
);

export default HomeStackFactory;
