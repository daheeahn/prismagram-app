import {Alert, Keyboard, TouchableWithoutFeedback} from 'react-native';

import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import React from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default () => {
  const emailInput = useInput('');
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handleLogin = () => {
    // 유효성 검증
    const {value} = emailInput;
    if (value === '') {
      return Alert.alert("Email can't be emtpy");
    } else if (!value.includes('@') || !value.includes('.')) {
      return Alert.alert('Please write an email');
    } else if (emailRegex.test(value)) {
      return Alert.alert('That email is invalid');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...emailInput}
          placeholder={'id'}
          keyboardType={'email-address'}
          autoCapitalize={'none'}
          returnKeyType={'send'}
          onEndEditing={handleLogin}
          autoCorrect={false}
        />
        <AuthButton text={'Log In'} onPress={handleLogin} />
      </View>
    </TouchableWithoutFeedback>
  );
};
