import 'react-native-gesture-handler';

import App from './App';
import {AppRegistry} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Sub from './src/screens/Sub';
import {name as appName} from './app.json';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const Container = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={App} />
      <Stack.Screen name="Sub" component={Sub} />
    </Stack.Navigator>
  </NavigationContainer>
);

AppRegistry.registerComponent(appName, () => Container);
