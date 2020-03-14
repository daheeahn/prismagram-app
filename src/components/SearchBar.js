import PropTypes from 'prop-types';
import React from 'react';
import {TextInput} from 'react-native';
import constants from '../utils/constants';
import styles from '../utils/styles';

const SearchBar = ({onChangeText, value, onSubmit}) => {
  return (
    <TextInput
      style={{
        width: constants.width - 40,
        height: 35,
        backgroundColor: styles.lightGrey,
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
      }}
      placeholderTextColor={styles.darkGrey}
      returnKeyType="search"
      onChangeText={onChangeText}
      value={value}
      placeholder={'Search'}
      onEndEditing={onSubmit}
    />
  );
};

SearchBar.PropTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
