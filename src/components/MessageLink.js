import NavIcon from './NavIcon';
import {Platform} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import styles from '../utils/styles';
import {withNavigation} from '@react-navigation/compat';

const Container = styled.TouchableOpacity``;

const Text = styled.Text``;

const MessageLink = withNavigation(({navigation}) => {
  return (
    <Container onPress={() => navigation.navigate('MessageNavigation')}>
      <NavIcon
        name={Platform.OS === 'ios' ? 'ios-paper-plane' : 'md-paper-plane'}
        color={styles.black}
      />
    </Container>
  );
});

export default MessageLink;
