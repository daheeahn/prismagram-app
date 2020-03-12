import React from 'react';
import styled from 'styled-components';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: pink;
`;

const Text = styled.Text``;

export default ({navigation}) => {
  return (
    <View>
      <Button onPress={() => navigation.navigate('UploadPhoto')}>
        <Text>Take Photo</Text>
      </Button>
    </View>
  );
};
