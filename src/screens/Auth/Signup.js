import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginButton,
  LoginManager,
} from 'react-native-fbsdk';
import {
  Alert,
  AsyncStorage,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import {CREATE_ACCOUNT} from './AuthQueries';
import constants from '../../utils/constants';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import {useMutation} from 'react-apollo-hooks';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-top-color: ${props => props.theme.lightGrey};
`;

export default ({navigation, route}) => {
  const fNameInput = useInput('');
  const lNameInput = useInput('');
  const usernameInput = useInput('');
  const emailInput = useInput(route?.params?.email || '');
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: usernameInput.value,
      email: emailInput.value,
      firstName: fNameInput.value,
      lastName: lNameInput.value,
    },
  });

  const handleSignup = async () => {
    // 유효성 검증
    const {value: email} = emailInput;
    const {value: fName} = fNameInput;
    const {value: lName} = lNameInput;
    const {value: username} = usernameInput;

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert('That email is invalid');
    }
    if (fName === '') {
      return Alert.alert('I need your name');
    }

    if (username === '') {
      return Alert.alert('Invalid username');
    }

    try {
      setLoading(true);
      const {
        data: {createAccount},
      } = await createAccountMutation();
      if (createAccount) {
        Alert.alert('Account created', 'Log in now!');
        navigation.navigate('Login', {email});
      }
    } catch (e) {
      console.log('signup errorr', e);
      Alert.alert('this username / email is already taken', 'log in instead');
      navigation.navigate('Login', {email}); // 이미 있으니까 로그인을 해야지
    } finally {
      setLoading(false);
    }
  };

  const _responseInfoCallback = (error, result) => {
    if (error) {
      console.log('Error fetching data: ', error);
    } else {
      const {id, name, last_name, first_name} = result;
      console.log('Success fetching data: ', result);
      emailInput.setValue('deg9810@gmail.com');
      fNameInput.setValue(first_name);
      lNameInput.setValue(last_name);
      // usernameInput.setValue(name); // username은 직접 입력하도록 둔다.
    }
  };

  const fbLogin = async () => {
    try {
      setLoading(true);

      const {
        isCancelled,
        grantedPermissions,
      } = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (isCancelled) {
        console.log('Login cancelled');
      } else {
        console.log(
          'Login success with permissions',
          grantedPermissions.toString(),
        );
        // const {accessToken} = await AccessToken.getCurrentAccessToken();
        // console.log('accessToken', accessToken);

        // email은 왜 안되지? 맨첨에 email이 없어서 그른가,,, 뭐지 했는데,,,,
        const infoRequest = new GraphRequest(
          '/me?fields=id,name,email,last_name,first_name', // accessToken 없어도 잘된다.
          null,
          _responseInfoCallback,
        );
        // Start the graph request.
        new GraphRequestManager().addRequest(infoRequest).start();
      }
      setLoading(false);
    } catch (error) {
      console.log('Login fail with error: ' + error);
    }
  };

  useEffect(() => {}, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...fNameInput}
          placeholder={'First Name'}
          autoCapitalize={'words'}
        />
        <AuthInput
          {...lNameInput}
          placeholder={'Last Name'}
          autoCapitalize={'words'}
        />
        <AuthInput
          {...emailInput}
          placeholder={'Email'}
          keyboardType={'email-address'}
          returnKeyType={'send'}
          autoCorrect={false}
        />
        <AuthInput
          {...usernameInput}
          placeholder={'User Name'}
          returnKeyType={'send'}
        />
        <AuthButton loading={loading} text={'Sign Up'} onPress={handleSignup} />
        <FBContainer>
          <AuthButton
            bgColor={'#2D4DA7'}
            loading={false}
            onPress={fbLogin}
            text={'Connect Fabebook'}
          />
          {/* <LoginButton
            // style={{width: constants.width / 1.7, backgroundColor: 'pink'}}
            onLoginFinished={(error, result) => {
              console.log('result by LoginButton', result);
              if (error) {
                console.log('login has error: ' + result.error);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  console.log(data.accessToken.toString());
                });
              }
            }}
            onLogoutFinished={() => console.log('logout.')}
          /> */}
        </FBContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};
