import Message from '../screens/Message/Message';
import Messages from '../screens/Message/Messages';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const MessageNavigation = () => (
  <Stack.Navigator headerMode={'none'}>
    <Stack.Screen name="Messages" component={Messages} />
    <Stack.Screen name="Message" component={Message} />
  </Stack.Navigator>
);

export default MessageNavigation;
