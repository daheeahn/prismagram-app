import React, {createContext, useContext, useState} from 'react';

import {useAsyncStorage} from '@react-native-community/async-storage';

// 변수를 포함하는 object 라고 생각하면 쉬움
export const AuthContext = createContext();

export const AuthProvider = ({isLoggedIn: isLoggedInProp, children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp); // local storage에 접근해서 유저 로그인 여부를 알아내기 위함
  const {getItem, setItem} = useAsyncStorage('isLoggedIn');
  const {getItem: getJwtItem, setItem: setJwtItem} = useAsyncStorage('jwt');

  const logUserIn = async token => {
    try {
      await setItem('true');
      await setJwtItem(token);
      setIsLoggedIn(true);
    } catch (e) {
      console.log('logUserIn', e);
    }
  };

  const logUserOut = async () => {
    try {
      await setItem('false');
      setIsLoggedIn(false);
    } catch (e) {
      console.log('logUserOut', e);
    }
  };

  //   const isLoggedIn = await getItem();
  //   if (isLoggedIn === null || isLoggedIn === 'false') {
  //     // TODO: parse 해야되는데
  //     setIsLoggedIn(false);
  //   } else {
  //     setIsLoggedIn(true);
  //   }
  return (
    <AuthContext.Provider value={{isLoggedIn, logUserIn, logUserOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useIsLoggedIn = () => {
  const {isLoggedIn} = useContext(AuthContext);
  console.log('isLoggedIn', isLoggedIn);
  return isLoggedIn;
};

export const useLogIn = () => {
  const {logUserIn} = useContext(AuthContext);
  return logUserIn;
};

export const useLogOut = () => {
  const {logUserOut} = useContext(AuthContext);
  return logUserOut;
};
