import {Text, TouchableOpacity, View} from 'react-native';
import {useIsLoggedIn, useLogIn, useLogOut} from '../context/AuthContext';

import React from 'react';

export default () => {
  const isLoggedIn = useIsLoggedIn();
  const logIn = useLogIn();
  const logOut = useLogOut();
  // 전체 어플리케이션 빌드하고 필요할 때마다 쓰는거야. 컴포넌트화 할 예정.

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {isLoggedIn ? (
        <TouchableOpacity onPress={logOut}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={logIn}>
          <Text>Log In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
