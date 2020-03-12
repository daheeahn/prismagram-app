import React from 'react';
import {Text} from 'react-native';
import {useIsLoggedIn} from '../context/AuthContext';

export default () => {
  const isLoggedIn = useIsLoggedIn();
  return <Text>NavController</Text>;
};
