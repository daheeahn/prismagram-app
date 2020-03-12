import {Text, TouchableOpacity, View} from 'react-native';

import React from 'react';

const AuthHome = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>AuthHome</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Go to Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text>Go to Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthHome;
