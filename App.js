import 'react-native-gesture-handler';

import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo-hooks';
import {AuthProvider} from './src/context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {InMemoryCache} from 'apollo-cache-inmemory';
import NavController from './src/components/NavController';
import {ThemeProvider} from 'styled-components';
import options from './apollo';
import {persistCache} from 'apollo-cache-persist';
import styles from './src/utils/styles';

const App = ({navigation}) => {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  // null 체크안함 / false 체크했는데 유저가 로그인 안한거 / true ~
  const {getItem, setItem} = useAsyncStorage('isLoggedIn');

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const preLoad = async () => {
    // await AsyncStorage.clear();
    // 비동기라 다시 할거라고? TODO:
    try {
      // 항상 이미지같은건 preload하도록 해!
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });

      const client = new ApolloClient({
        cache,
        // headers: {
        //   Authorization: `,
        // },
        request: async operation => {
          // 이 함수가 리턴하는 값은 요청마다 추가도ㅔㅐ. 이함수가 매 요청마다 호출되는거지.
          // 매 요청을 중간에 가로채는거야.
          const token = await AsyncStorage.getItem('jwt');
          return operation.setContext({
            // 요청마다 이 함수가 실행돼.
            headers: {Authorization: `Bearer ${token}`},
          });
        },
        ...options,
      });

      const isLoggedInFS = await getItem();
      if (isLoggedInFS === null || isLoggedInFS === 'false') {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }

      setLoaded(true);
      setClient(client);
    } catch (error) {
      Alert.alert('error!');
      console.log('🚫', error);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client && isLoggedIn !== null ? (
    // null이 아니지 false가 아닌건 아니야! 주의하기
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <Text>loading...</Text>
  );
};

export default App;
