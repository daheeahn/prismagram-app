import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {logErr} from '../../utils/utils';
import {RNCamera} from 'react-native-camera';
import Loader from '../../components/Loader';
import constants from '../../utils/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
import styles from '../../utils/styles';

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

const Touchable = styled.TouchableOpacity``;

export default ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
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

  return loading ? (
    <Loader />
  ) : (
    hasPermission && (
      <View>
        <RNCamera
          style={{
            width: constants.width,
            height: constants.height / 2,
            justifyContent: 'flex-end',
            padding: 10,
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
      </View>
    )
  );
};
