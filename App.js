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
import styles from './styles';

const App = ({navigation}) => {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  // null 체크안함 / false 체크했는데 유저가 로그인 안한거 / true ~
  const {getItem, setItem} = useAsyncStorage('isLoggedIn');

  const preLoad = async () => {
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
        ...options,
      });

      setLoaded(true);
      setClient(client);
    } catch (error) {
      Alert.alert('error!');
      console.log(error);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client ? ( // null이 아니지 false가 아닌건 아니야! 주의하기
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <Text>loading...</Text>
  );
};

export default App;
