import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import styles from '../utils/styles';

const NavIcon = ({name, color = styles.black, size = 26}) => {
  return <Ionicons name={name} color={color} size={size} />;
};

NavIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default NavIcon;
