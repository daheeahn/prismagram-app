import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native';
import constants from '../utils/constants';
import styles from '../utils/styles';

const SearchBar = ({onChangeText, onSubmit}) => {
  const [value, setValue] = useState('') // useEffect로 한거라서 Search에서 한번 렌더링 된 후에는 뭐가 안돼. 그래서 여기서 해줘야 하고, Search에서는 안해줘도 됨

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
      onChangeText={(text) => {
        onChangeText(text)
        setValue(text)
      }}
      value={value}
      placeholder={'Search'}
      onEndEditing={onSubmit}
    />
  );
};

SearchBar.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
