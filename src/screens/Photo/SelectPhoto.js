import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {PERMISSIONS, check, RESULTS, request} from 'react-native-permissions';
import Loader from '../../components/Loader';
import {logErr, imgToReplace, seulJJo} from '../../utils/utils';
import CameraRoll from '@react-native-community/cameraroll';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import constants from '../../utils/constants';
import styles from '../../utils/styles';

const View = styled.View`
  flex: 1;
`;

const Button = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  right: 10px;
  width: 120px;
  height: 35px;
  border-radius: 10px;
  background-color: ${styles.blue};
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: white;
`;

export default ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState(null);
  const [allPhotos, setAllPhotos] = useState([]);
  const changeSelected = photo => {
    setSelected(photo);
  };

  const getPhotos = async () => {
    try {
      const {edges} = await CameraRoll.getPhotos({
        first: 10,
      });
      console.log('📸', edges);
      const edgedsWithId = edges.map((edge, index) => ({
        ...edge.node,
        id: index,
      }));

      console.log('edgedsWithId', edgedsWithId);

      const firstPhoto = edgedsWithId[0];
      setSelected(firstPhoto);
      setAllPhotos(edgedsWithId);
    } catch (error) {
      alert('getPhoto error');
      logErr('getPhoto', error);
    } finally {
      setLoading(false);
    }
  };

  const askPermission = async () => {
    try {
      const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      console.log('result', result);
      if (result === RESULTS.GRANTED) {
        setHasPermission(true);
        getPhotos();
      }
    } catch (error) {
      alert('ask error');
      logErr('askPermission', error);
    }
  };

  const handleSelected = () => {
    console.log('😷 selected', selected);
    navigation.navigate('UploadPhoto', {photo: selected.image.uri});
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          {hasPermission ? (
            <>
              <Image
                source={{uri: selected.image.uri || seulJJo}}
                style={{width: constants.width, height: constants.height / 2}}
              />
              <Button onPress={handleSelected}>
                <Text>Select Photo</Text>
              </Button>
              <ScrollView contentContainerStyle={{flexDirection: 'row'}}>
                {allPhotos.map((photo, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => changeSelected(photo)}>
                      <Image
                        source={{uri: photo.image.uri}}
                        style={{
                          width: constants.width / 3,
                          height: constants.height / 6,
                          opacity: photo.id === selected.id ? 0.5 : 1,
                        }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </>
          ) : null}
        </View>
      )}
    </View>
  );
};
