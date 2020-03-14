import {FEED_QUERY} from './HomeQueries';
import Loader from '../../components/Loader';
import React from 'react';
import styled from 'styled-components';
// import {useQuery} from '@apollo/react-hooks';
import {useQuery} from 'react-apollo-hooks';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: green;
`;

const Text = styled.Text``;

export default ({navigation}) => {
  const {data, loading} = useQuery(FEED_QUERY); // persistCache가 설정해둔거래 data는
  console.log('hi', data, loading);
  return (
    <View>
      {loading && <Loader />}
      {/* <Text>Home (Feed)</Text> */}
    </View>
  );
};
