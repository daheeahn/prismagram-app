import {Alert, Keyboard, TouchableWithoutFeedback} from 'react-native';
import React, {useState} from 'react';

import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import {LOG_IN} from './AuthQueries';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import {useMutation} from 'react-apollo-hooks';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default ({navigation, route}) => {
  // const emailInput = useInput(route?.params?.email || ''); // TODO:
  const emailInput = useInput(route?.params?.email || 'deg9810@gmail.com');
  const [loading, setLoading] = useState(false);
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: {email: emailInput.value},
  });

  const handleLogin = async () => {
    // 유효성 검증
    const {value} = emailInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value === '') {
      return Alert.alert("Email can't be emtpy");
    } else if (!value.includes('@') || !value.includes('.')) {
      return Alert.alert('Please write an email');
    } else if (!emailRegex.test(value)) {
      console.log('value', value);
      return Alert.alert('That email is invalid');
    }

    try {
      setLoading(true);
      console.log('🚼');

      const {
        data: {requestSecret},
      } = await requestSecretMutation();

      console.log('2', requestSecret);

      if (requestSecret) {
        Alert.alert('Check your email');
        navigation.navigate('Confirm', {email: value, requestSecret});
      } else {
        Alert.alert('Account not found');
        navigation.navigate('Signup', {email: value});
      }
    } catch (e) {
      console.log('login errorr', e);
      Alert.alert("Can't log in now");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...emailInput}
          placeholder={'email'}
          keyboardType={'email-address'}
          autoCapitalize={'none'}
          returnKeyType={'send'}
          onSubmitEditing={handleLogin}
          autoCorrect={false}
        />
        <AuthButton loading={loading} text={'Log In'} onPress={handleLogin} />
      </View>
    </TouchableWithoutFeedback>
  );
};
