import {Image, Platform} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import React from 'react';
import Swiper from 'react-native-swiper';
import constants from '../utils/constants';
import styled from 'styled-components';

const Container = styled.View``;
const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;
const Bold = styled.Text`
  font-weight: 500;
`;
const Location = styled.Text`
  font-size: 12px;
`;
const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;
const IconContainer = styled.View`
  margin-right: 10px;
`;
const InfoContainer = styled.View`
  padding: 10px;
`;
const Caption = styled.Text`
  margin: 3px 0px;
`;
const CommentCount = styled.Text`
  margin-top: 5px;
  opacity: 0.5;
  font-size: 12px;
`;

const loves = [
  'https://cphoto.asiae.co.kr/listimglink/1/2018101828319792_1539836640.png',
  'https://lh3.googleusercontent.com/proxy/Fbb5TO5ApHzdE9FMSIInTXqi8ghIOZIjXg52-PV8ymEYPaPff7FOJOUS7RyMsMgI15gBvHPsELEbGTRtnxpNBO3tvvfU5Ehl2kHirxOndZKKOVwBxJv7qEWQlPJ1zqhhtCXwGp_QjQQ',
];

const Post = ({
  user,
  location,
  files = [],
  likeCount,
  caption,
  comments = [],
}) => {
  return (
    <Container>
      <Header>
        <Touchable>
          <Image
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              backgroundColor: 'black',
            }}
            source={{uri: user.avatar}}
          />
        </Touchable>
        <Touchable>
          <HeaderUserContainer>
            <Bold>{user.username}</Bold>
            <Location>{location}</Location>
          </HeaderUserContainer>
        </Touchable>
      </Header>

      <Swiper
        // showsButtons={false}
        // showsPagination={false}
        // paginationStyle={{color}}
        loop={false}
        style={{height: constants.height / 2.5}}>
        {/* {files.map(file => { */}
        {loves.map((file, index) => {
          return (
            <Image
              //   key={file.id}
              key={index}
              style={{height: constants.height / 2.5, width: constants.width}}
              resizeMode="contain"
              source={{uri: file}}
            />
          );
        })}
      </Swiper>
      <InfoContainer>
        <IconsContainer>
          <Touchable>
            <IconContainer>
              <Ionicons
                size={28}
                name={
                  Platform.OS === 'ios' ? 'ios-heart-empty' : 'md-heart-empty'
                }
              />
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Ionicons
                size={28}
                name={Platform.OS === 'ios' ? 'ios-text' : 'md-text'}
              />
            </IconContainer>
          </Touchable>
        </IconsContainer>
        <Touchable>
          <Bold>{likeCount === 1 ? '1 like' : `${likeCount} likes`}</Bold>
        </Touchable>
        <Caption>
          <Bold>{user.username}</Bold>
          {caption}
        </Caption>
        <Touchable>
          <CommentCount>
            [Challenge] See all {comments.length} comments
          </CommentCount>
        </Touchable>
      </InfoContainer>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
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
      }).isRequired,
    }),
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};

export default Post;
