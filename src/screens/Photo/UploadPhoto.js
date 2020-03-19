import React from 'react';
import styled from 'styled-components';
import {Image} from 'react-native';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default ({navigation, route}) => {
  const {photo} = route.params;
  return (
    <View>
      <Text>Upload Photo {photo}</Text>
      <Image source={{uri: photo}} style={{width: 100, height: 100}} />
    </View>
  );
};
