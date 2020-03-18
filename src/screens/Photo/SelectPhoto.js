import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {PERMISSIONS, check, RESULTS, request} from 'react-native-permissions';
import Loader from '../../components/Loader';
import {logErr, imgToReplace} from '../../utils/utils';
import CameraRoll from '@react-native-community/cameraroll';
import {Image, ScrollView} from 'react-native';
import constants from '../../utils/constants';
const View = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

export default () => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState(null);
  const [allPhotos, setAllPhotos] = useState([]);

  const getPhotos = async () => {
    try {
      const {edges} = await CameraRoll.getPhotos({
        first: 10,
      });
      console.log('📸', edges);

      const firstPhoto = edges[0].node.image;
      setSelected(firstPhoto);
      setAllPhotos(edges);
    } catch (error) {
      alert('getPhoto error');
      logErr('getPhoto', error);
    } finally {
      setLoading(false);
    }
  };

  const askPermission = async () => {
    try {
      const result = await request(PERMISSIONS.IOS.CAMERA);
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
                source={{uri: selected.uri || imgToReplace}}
                style={{width: constants.width, height: constants.height / 2}}
              />
              <ScrollView contentContainerStyle={{flexDirection: 'row'}}>
                {allPhotos.map((photo, index) => (
                  <Image
                    key={index}
                    source={{uri: photo.node.image.uri}}
                    style={{
                      width: constants.width / 3,
                      height: constants.height / 6,
                    }}
                  />
                ))}
              </ScrollView>
            </>
          ) : null}
        </View>
      )}
    </View>
  );
};
