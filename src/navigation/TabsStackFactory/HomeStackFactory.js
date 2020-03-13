import Home from '../../screens/Tabs/Home';
import {Image} from 'react-native';
import MessageLink from '../../components/MessageLink';
import NavIcon from '../../components/NavIcon';
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
      headerTitle
      options={{
        headerRight: () => <MessageLink />,
        headerTitle: <NavIcon name={'logo-instagram'} size={36} />,
      }}
    />
  </Stack.Navigator>
);

export default HomeStackFactory;
