import React from 'react';
import {ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useQuery} from 'react-apollo-hooks';
import {gql} from 'apollo-boost';
import {POST_FRAGMENT} from '../utils/fragment';
import Loader from '../components/Loader';
import Post from '../components/Post';

const POST_DETAIL = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

const Detail = () => {
  const route = useRoute();
  const id = route.params.id;

  const {loading, data} = useQuery(POST_DETAIL, {
    variables: {id},
  });
  console.log('SEARCH', loading, data);

  return (
    // View가 아니라 ScrollVie로 해야 이미지가 보인다!? 왜지? slider가 height를 잘 인식 못해나봐.
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data?.seeFullPost && <Post {...data.seeFullPost} />
      )}
    </ScrollView>
  );
};
export default Detail;
