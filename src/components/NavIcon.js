import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import styles from '../utils/styles';

const NavIcon = ({focused = true, name, color = styles.black, size = 24}) => {
  return (
    <Ionicons
      name={name}
      color={focused ? color : styles.darkGrey}
      size={size}
    />
  );
};

NavIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  focused: PropTypes.bool,
};

export default NavIcon;
