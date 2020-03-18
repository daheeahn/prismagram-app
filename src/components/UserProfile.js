import React, {useState} from 'react';
import {Image, Platform} from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {seulJJo} from '../utils/utils';
import styles from '../utils/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import constants from '../utils/constants';
import SquarePhoto from './SquarePhoto';
import Post from './Post';

const View = styled.View``;
const Text = styled.Text``;

const ProfileHeader = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderColumn = styled.View``;

const ProfileStats = styled.View`
  flex-direction: row;
`;

const Stat = styled.View`
  align-items: center;
  margin-left: 40px;
`;

const Bold = styled.Text`
  font-weight: 600;
`;

const StatName = styled.Text`
  margin-top: 10;
  font-size: 12px;
  color: ${styles.darkGrey};
`;

const ProfileMeta = styled.View`
  margin-top: 10px;
  padding: 20px;
`;

const Bio = styled.Text``;

const Touchable = styled.TouchableOpacity``;

const ButtonContainer = styled.View`
  border: 1px solid ${styles.lightGrey};
  padding: 5px 0px;
  flex-direction: row;
  margin-top: 30px;
`;
const Button = styled.View`
  width: ${constants.width / 2};
  align-items: center;
`;

// user profile 화면에 있는거 전부 다 UserProfile component에다가 offload할거야
// const UserProfile = ({avartar = imgToReplace}) => {
const UserProfile = ({
  avartar,
  postsCount,
  followersCount,
  followingCount,
  fullName,
  bio,
  posts,
}) => {
  const [isGrid, setIsGrid] = useState(true);
  const toggleGrid = () => setIsGrid(i => !i);

  return (
    <View>
      <ProfileHeader>
        <Image
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,
            backgroundColor: 'pink',
          }}
          source={{uri: avartar || seulJJo}}
        />
        <HeaderColumn>
          <ProfileStats>
            <Stat>
              <Bold>{postsCount}</Bold>
              <StatName>Posts</StatName>
            </Stat>
            <Stat>
              <Bold>{followersCount}</Bold>
              <StatName>Followers</StatName>
            </Stat>
            <Stat>
              <Bold>{followingCount}</Bold>
              <StatName>Following</StatName>
            </Stat>
          </ProfileStats>
        </HeaderColumn>
      </ProfileHeader>
      <ProfileMeta>
        <Bold>{fullName}</Bold>
        <Bio>{bio}</Bio>
      </ProfileMeta>
      <ButtonContainer>
        <Touchable onPress={toggleGrid}>
          <Button>
            <Ionicons
              size={32}
              color={isGrid ? styles.black : styles.darkGrey}
              name={Platform.OS === 'ios' ? 'ios-grid' : 'md-grid'}
            />
          </Button>
        </Touchable>
        <Touchable onPress={toggleGrid}>
          <Button>
            <Ionicons
              size={32}
              color={!isGrid ? styles.black : styles.darkGrey}
              name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
            />
          </Button>
        </Touchable>
      </ButtonContainer>
      {posts?.map(p =>
        isGrid ? <SquarePhoto key={p.id} {...p} /> : <Post key={p.id} {...p} />,
      )}
    </View>
  );
};

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
  avartar: PropTypes.string,
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isSelf: PropTypes.bool.isRequired,
  bio: PropTypes.string.isRequired,
  followingCount: PropTypes.number.isRequired,
  followersCount: PropTypes.number.isRequired,
  postsCount: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avartar: PropTypes.string,
        username: PropTypes.string.isRequired,
      }).isRequired,
      files: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        }),
      ).isRequired,
      likeCount: PropTypes.number.isRequired,
      isLiked: PropTypes.bool.isRequired,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
          }),
        }),
      ),
      caption: PropTypes.string.isRequired,
      location: PropTypes.string,
      createdAt: PropTypes.string,
    }),
  ),
};

export default UserProfile;
