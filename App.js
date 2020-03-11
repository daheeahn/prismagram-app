import 'react-native-gesture-handler';

import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {InMemoryCache} from 'apollo-cache-inmemory';
import options from './apollo';
import {persistCache} from 'apollo-cache-persist';

const App = ({navigation}) => {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);

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

  const [load, setLoad] = useState(false);

  return loaded && client ? (
    <ApolloProvider client={client}>
      <TouchableOpacity onPress={() => navigation.navigate('Sub')}>
        <Image
          source={{uri: 'https://pbs.twimg.com/media/EF9H2emUUAA5LGj.jpg'}}
          style={{
            width: 300,
            height: 300,
            backgroundColor: load ? 'pink' : 'green',
          }}
          onLoad={event => {
            console.log(event);
            setLoad(true);
          }}
        />
        <Text>{!load ? 'loading...' : 'completed'}</Text>
        <Icon name="ios-home" size={30} color="#900" />
      </TouchableOpacity>
    </ApolloProvider>
  ) : (
    <Text>loading...</Text>
  );
};

export default App;
