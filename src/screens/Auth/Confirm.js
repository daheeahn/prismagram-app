import {Alert, Keyboard, TouchableWithoutFeedback} from 'react-native';
import React, {useState} from 'react';

import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import {CONFIRM_SECRET} from './AuthQueries';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import {useLogIn} from '../../context/AuthContext';
import {useMutation} from 'react-apollo-hooks';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default ({navigation, route}) => {
  // console.log(route.params.email);
  const confirmInput = useInput(route.params.requestSecret || '');
  const logIn = useLogIn();
  const [loading, setLoading] = useState(false);
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: confirmInput.value,
      email: route.params.email,
    },
  });

  const handleConfirm = async () => {
    const {value} = confirmInput;
    if (value === '' || !value.includes(' ')) {
      return Alert.alert('invalid secret');
    }
    try {
      setLoading(true);

      const {
        data: {confirmSecret},
      } = await confirmSecretMutation();

      if (confirmSecret !== '' || confirmSecret !== false) {
        console.log('confirmSecret', confirmSecret);
        logIn(confirmSecret);
      } else {
        Alert.alert('Wrong Secret!');
      }
    } catch (e) {
      console.log('confirm errorr', e);
      Alert.alert("Can't Confirm now");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...confirmInput}
          placeholder={'Secret'}
          autoCapitalize={'none'}
          returnKeyType={'send'}
          onSubmitEditing={handleConfirm}
        />
        <AuthButton
          loading={loading}
          text={'Confirm'}
          onPress={handleConfirm}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
