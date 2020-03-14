import {gql} from 'apollo-boost';

export const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avartar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        # user {
        #   id
        #   username
        # }
      }
      createdAt
    }
  }
`;
