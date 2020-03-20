import React, {useState} from 'react';
import styled from 'styled-components';
import {Image, Alert} from 'react-native';
import useInput from '../../hooks/useInput';
import styles from '../../utils/styles';
import axios from 'axios';

const View = styled.View`
  flex: 1;
`;

const UploadContainer = styled.View`
  margin: 20px;
  flex-direction: row;
`;

const InputContainer = styled.View`
  flex: 1;
  justify-content: center;
  /* align-items: center; */
  padding: 0px 10px;
  padding-left: 20px;
`;

const Touchable = styled.TouchableOpacity``;

const Button = styled.View`
  width: 250px;
  height: 40px;
  background-color: ${styles.blue};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-top: 10px;
`;

const Text = styled.Text`
  color: white;
`;

const TextInput = styled.TextInput`
  height: 40px;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${styles.darkGrey};
`;

export default ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const {photo} = route.params;
  console.log('🤧', photo);
  const {value: caption, onChangeText: onChangeCaptionText} = useInput(
    'caption',
  );
  const {value: location, onChangeText: onChangeLocationText} = useInput(
    'location',
  );

  const handleSubmit = async () => {
    if (caption === '' || location === '') {
      alert('input!');
    }
    const formData = new FormData(); // form인 것처럼 행동해 얘는
    const name = photo.filename || 'filenamedummy.jpg';
    const [, type] = name.split('.');
    formData.append('file', {
      name,
      type: type.toLowerCase(),
      uri: photo.uri,
    }); // server에서 file로 달라고 했었지?

    try {
      const {
        data: {path},
      } = await axios.post('http://localhost:4000/api/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      console.log('🥵', path);
      setFileUrl(path);
    } catch (error) {
      Alert.alert('imgUpload error');
      console.log('imgUpload error', error);
    }
  };

  return (
    <View>
      <UploadContainer>
        <Image source={{uri: photo.uri}} style={{width: 100, height: 100}} />
        <InputContainer>
          <TextInput
            onChangeText={onChangeCaptionText}
            value={caption}
            placeholder="Caption"
          />
          <TextInput
            onChangeText={onChangeLocationText}
            value={location}
            placeholder="Locaion"
          />
          <Touchable onPress={handleSubmit}>
            <Button>
              <Text>Upload</Text>
            </Button>
          </Touchable>
        </InputContainer>
      </UploadContainer>
    </View>
  );
};
