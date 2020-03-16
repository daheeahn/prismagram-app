import {Alert, RefreshControl, ScrollView} from 'react-native';
import React, {useState} from 'react';

import Loader from '../../components/Loader';
import Post from '../../components/Post';
import styled from 'styled-components';
import {useQuery} from 'react-apollo-hooks';
import {gql} from 'apollo-boost';
import {POST_FRAGMENT} from '../../utils/fragment';

export const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const {data, loading, refetch} = useQuery(FEED_QUERY); // persistCache가 설정해둔거래 data는
  console.log('hi', data, loading);

  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (error) {
      console.log('feed error', error);
      Alert.alert('feed error!');
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }>
      {loading ? (
        <Loader />
      ) : (
        data?.seeFeed?.map(post => <Post key={post.id} {...post} />)
      )}
    </ScrollView>
  );
};
