import React from 'react';
import {ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useQuery} from 'react-apollo-hooks';
import {gql} from 'apollo-boost';
import {USER_FRAGMENT} from '../utils/fragment';
import Loader from '../components/Loader';
import UserProfile from '../components/UserProfile';

const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

const Detail = () => {
  const route = useRoute();
  const username = route.params.username;

  const {loading, data} = useQuery(GET_USER, {
    variables: {username},
  });
  console.log('GET_USER', loading, data);

  return (
    // View가 아니라 ScrollVie로 해야 이미지가 보인다!? 왜지? slider가 height를 잘 인식 못해나봐.
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data?.seeUser && <UserProfile {...data.seeUser} />
      )}
    </ScrollView>
  );
};
export default Detail;
