import React, {useEffect, useLayoutEffect, useState} from 'react';

import SearchBar from '../../components/SearchBar';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const Search = ({navigation, route}) => {
  const {value, onChangeText} = useInput();

  const onSubmit = () => {
    console.log('submit!!!!');
    alert('onSubmit!');
  };

  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [input])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <SearchBar
            value={value}
            onChangeText={onChangeText}
            onSubmit={onSubmit}
          />
        );
      },
    });
  }, [navigation]);

  return (
    <View>
      <Text>Search: {value}</Text>
    </View>
  );
};

export default Search;

// export default class extends React.Component {
//   static screenOptions = () => ({title: 'Hello'});
//   render() {
//     return (
//       <View>
//         <Text>Search</Text>
//       </View>
//     );
//   }
// }
