import React from 'react';
import styled from 'styled-components';
import {withNavigation} from '@react-navigation/compat';

const Container = styled.TouchableOpacity``;

const Text = styled.Text``;

const MessageLink = withNavigation(({navigation}) => {
  return (
    <Container onPress={() => navigation.navigate('MessageNavigation')}>
      <Text>hsssssi</Text>
    </Container>
  );
});

export default MessageLink;
