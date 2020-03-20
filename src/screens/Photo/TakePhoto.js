import React, {useEffect, useState, useRef, createRef} from 'react';
import styled from 'styled-components';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {logErr} from '../../utils/utils';
import {RNCamera} from 'react-native-camera';
import Loader from '../../components/Loader';
import constants from '../../utils/constants';
import CameraRoll from '@react-native-community/cameraroll';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
import styles from '../../utils/styles';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Button = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 10px solid ${styles.lightGrey};
  background-color: pink;
`;

const Touchable = styled.TouchableOpacity``;

export default ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [canTakePhoto, setCanTakePhoto] = useState(true);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const cameraRef = React.useRef(null);

  const takePhoto = async () => {
    if (!canTakePhoto) {
      return;
    }
    try {
      // setCanTakePhoto(false); // 한 번 찍으면 다시는 찍을 수 없음.
      if (cameraRef) {
        const data = await cameraRef.current.takePictureAsync({
          quality: 1,
          exif: true,
        });
        console.log('😻 data', data.uri);
        if (data) {
          const uri = await CameraRoll.saveToCameraRoll(data.uri);
          console.log('🐤result', uri);
          navigation.navigate('UploadPhoto', {photo: data});
        }
      }
    } catch (error) {
      alert('takePhoto');
      logErr('takePhoto', error);
      setCanTakePhoto(true);
    }
  };
  const toggleCameraType = () =>
    setCameraType(
      cameraType === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back,
    );

  const askPermission = async () => {
    try {
      const result = await request(PERMISSIONS.IOS.CAMERA);
      if (result === RESULTS.GRANTED) {
        setHasPermission(true);
      }
    } catch (error) {
      alert('take photo permission error');
      logErr('take photo permission', error);
      setHasPermission(false);
    } finally {
      setLoading(false);
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
        hasPermission && (
          <>
            <RNCamera
              ref={cameraRef}
              style={{
                width: constants.width,
                height: constants.height / 2,
                justifyContent: 'flex-end',
                padding: 20,
              }}
              type={
                cameraType === RNCamera.Constants.Type.back
                  ? RNCamera.Constants.Type.back
                  : RNCamera.Constants.Type.front
              }
              captureAudio={false}>
              <Touchable onPress={toggleCameraType}>
                <Ionicons
                  size={28}
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-reverse-camera'
                      : 'md-reverse-camera'
                  }
                  color={styles.black}
                />
              </Touchable>
            </RNCamera>
            <View>
              <Touchable disabled={!canTakePhoto} onPress={takePhoto}>
                <Button />
              </Touchable>
            </View>
          </>
        )
      )}
    </View>
  );
};
