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
  const handleLogin = () => {
    // 유효성 검증
  };

  return (
    <View>
      <AuthInput
        {...emailInput}
        placeholder={'id'}
        keyboardType={'email-address'}
        autoCapitalize={'none'}
      />
      <AuthButton text={'Log In'} onPress={() => {}} />
    </View>
  );
};
