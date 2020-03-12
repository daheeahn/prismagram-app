import App from '../../App';
import AuthHome from '../screens/Auth/AuthHome';
import Confirm from '../screens/Auth/Confirm';
import Login from '../screens/Auth/Login';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Signup from '../screens/Auth/Signup';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthNavigation = () => (
  <Stack.Navigator initialRouteName="Login" headerMode={'none'}>
    <Stack.Screen name="AuthHome" component={AuthHome} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Confirm" component={Confirm} />
    <Stack.Screen name="Signup" component={Signup} />
  </Stack.Navigator>
);

export default AuthNavigation;
