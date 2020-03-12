import 'react-native-gesture-handler';

import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ThemeProvider} from 'styled-components';
import options from './apollo';
import {persistCache} from 'apollo-cache-persist';
import styles from './styles';

const App = ({navigation}) => {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  // null 체크안함 / false 체크했는데 유저가 로그인 안한거 / true ~
  const [isLoggedIn, setIsLoggedIn] = useState(null); // local storage에 접근해서 유저 로그인 여부를 알아내기 위함

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

      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

      if (isLoggedIn === null || isLoggedIn === 'false') {
        // TODO: parse 해야되는데
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }

      setLoaded(true);
      setClient(client);
    } catch (error) {
      Alert.alert('error!');
      console.log(error);
    }
  };

  const logUserIn = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    } catch (e) {
      console.log('logUserIn', e);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false');
      setIsLoggedIn(false);
    } catch (e) {
      console.log('logUserOut', e);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client && isLoggedIn !== null ? ( // null이 아니지 false가 아닌건 아니야! 주의하기
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        {/* <Image
          source={{uri: 'https://pbs.twimg.com/media/EF9H2emUUAA5LGj.jpg'}}
          style={{
            width: 300,
            height: 300,
            backgroundColor: load ? 'pink' : 'green',
          }}
          onLoad={event => {
            console.log(event);
          }}
        /> */}
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          {isLoggedIn ? (
            <TouchableOpacity onPress={logUserOut}>
              <Text>Log Out</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={logUserIn}>
              <Text>Log In</Text>
            </TouchableOpacity>
          )}
        </View>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <Text>loading...</Text>
  );
};

export default App;
