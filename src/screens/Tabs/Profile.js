import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components';
import {useQuery} from 'react-apollo-hooks';
import {gql} from 'apollo-boost';
import {USER_FRAGMENT} from '../../utils/fragment';
import Loader from '../../components/Loader';
import UserProfile from '../../components/UserProfile';

export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

// export const GET_USER = gql`
//   query seeUser($username: String!) {
//     seeUser(username: $username) {
//   }
// `;

const Text = styled.Text``;

export default ({navigation}) => {
  const {loading, data} = useQuery(ME);
  console.log('Profile me', loading, data);

  return (
    <ScrollView>
      {loading ? <Loader /> : data?.me && <UserProfile {...data.me} />}
    </ScrollView>
  );
};
