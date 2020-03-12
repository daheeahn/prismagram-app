import PropTypes from 'prop-types';
import React from 'react';
import constants from '../utils/constants';
import styled from 'styled-components';

const Container = styled.View`
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
  width: ${constants.width / 2};
  padding: 10px;
  background-color: ${props => props.theme.grey};
  border: 1px solid ${props => props.theme.darkGrey};
  border-radius: 4px;
`;

const AuthInput = ({
  placeholder,
  value,
  keyboardType = 'default',
  autoCapitalize = 'none',
  onChangeText,
}) => {
  return (
    <Container>
      <TextInput
        keyboardType={keyboardType}
        placeholder={placeholder}
        value={value}
        autoCapitalize={autoCapitalize}
        onChangeText={onChangeText}
      />
    </Container>
  );
};

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    'default',
    'number-pad',
    'decimal-pad',
    'numberic',
    'email-address',
    'phone-pad',
  ]),
  autoCapitalize: PropTypes.oneOf(['characters', 'words', 'sentences', 'none']),
  onChangeText: PropTypes.func.isRequired,
};

export default AuthInput;
