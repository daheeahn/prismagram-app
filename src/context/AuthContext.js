import React, {createContext, useContext, useState} from 'react';

import {useAsyncStorage} from '@react-native-community/async-storage';

// 변수를 포함하는 object 라고 생각하면 쉬움
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // local storage에 접근해서 유저 로그인 여부를 알아내기 위함
  const {getItem, setItem} = useAsyncStorage('isLoggedIn');

  const logUserIn = async () => {
    try {
      await setItem('true');
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
  console.log(isLoggedIn);
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
