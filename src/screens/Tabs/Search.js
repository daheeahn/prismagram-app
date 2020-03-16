import React, {useEffect, useLayoutEffect, useState, useRef} from 'react';
import {ScrollView, RefreshControl} from 'react-native';

import SearchBar from '../../components/SearchBar';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import {gql} from 'apollo-boost';
import {useQuery} from 'react-apollo-hooks';
import Loader from '../../components/Loader';
import SquarePhoto from '../../components/SquarePhoto';

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      caption
      files {
        url
      }
      likeCount
      commentCount
    }
  }
`;

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const Search = ({navigation, route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const term = useRef();
  const {loading, data, refetch} = useQuery(SEARCH, {
    variables: {term: term.current},
    skip: shouldFetch === false, // useEffect보다 좋은 방법!
    fetchPolicy: 'network-only', // 검색할 때마다 네트워크에 요청. 캐시에 저장된거 받아오지 않고! // 캐시에서 받아오고 싶지 않을 때
  });
  console.log('SEARCH', loading, data);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({variables: {term: term.current}});
    } catch (error) {
      console.log('onRefresh', error);
    } finally {
      setRefreshing(false);
    }
  };

  const onChangeText = text => {
    setShouldFetch(false);
    // 넘어온 text가 state일 필요는 없고, 이걸 이용해서 search 하면 되는거. // 근데 search value 넘기려면
    term.current = text;
    console.log('term.current', term.current);
  };

  const onSubmit = () => {
    setShouldFetch(true);
  };

  useEffect(() => {
    if (shouldFetch === true) {
      console.log('now we fetch');
    }
  }, [shouldFetch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchBar
          onChangeText={onChangeText}
          onSubmit={onSubmit}
          shouldFetch={shouldFetch}
        />
      ),
    });
  }, [navigation]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }>
      {loading ? (
        <Loader />
      ) : (
        data?.searchPost?.map(post => {
          console.log(post);
          return <SquarePhoto key={post.id} {...post} />;
        })
      )}
    </ScrollView>
  );
};

export default Search;
