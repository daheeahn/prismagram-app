import AuthButton from '../../components/AuthButton';
import React from 'react';
import constants from '../../utils/constants';
import styled from 'styled-components';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  width: ${constants.width / 2.5};
  margin-bottom: 0px;
`;

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View``;
const LoginLinkText = styled.Text`
  color: ${props => props.theme.blue};
  margin-top: 20px;
  font-weight: 600;
`;

const AuthHome = ({navigation}) => {
  return (
    <View>
      <Image source={require('../../assets/logo.png')} resizeMode={'contain'} />
      <AuthButton
        text={'Create New Account'}
        onPress={() => navigation.navigate('Signup')}
      />
      <Touchable onPress={() => navigation.navigate('Login')}>
        <LoginLink>
          <LoginLinkText>Log In</LoginLinkText>
        </LoginLink>
      </Touchable>
    </View>
  );
};

export default AuthHome;
