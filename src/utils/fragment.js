import {gql} from 'apollo-boost';

export const POST_FRAGMENT = gql`
  fragment PostParts on Post {
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
      #   ...UserParts
      # }
    }
    createdAt
  }
  # ${USER_FRAGMENT}
`;

export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    avartar
    username
    fullName
    isFollowing
    isSelf
    bio
    followingCount
    followersCount
    postsCount
    posts {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;
