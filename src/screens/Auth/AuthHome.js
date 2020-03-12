import React from 'react';
import constants from '../../utils/constants';
import styled from 'styled-components';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const Image = styled.Image`
  width: ${constants.width / 2.5};
  margin-bottom: 0px;
`;

const Touchable = styled.TouchableOpacity``;

const SignupBtn = styled.View`
  background-color: ${props => props.theme.blue};
  padding: 10px;
  margin: 0px 50px;
  border-radius: 4px;
  width: ${constants.width / 2};
  margin-bottom: 25px;
`;

const SignupBtnText = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

const LoginLink = styled.View``;
const LoginLinkText = styled.Text`
  color: ${props => props.theme.blue};
`;

const AuthHome = ({navigation}) => {
  return (
    <View>
      <Image source={require('../../assets/logo.png')} resizeMode={'contain'} />
      <Touchable onPress={() => navigation.navigate('Signup')}>
        <SignupBtn>
          <SignupBtnText>Create New Account</SignupBtnText>
        </SignupBtn>
      </Touchable>
      <Touchable onPress={() => navigation.navigate('Login')}>
        <LoginLink>
          <LoginLinkText>Log In</LoginLinkText>
        </LoginLink>
      </Touchable>
    </View>
  );
};

export default AuthHome;
