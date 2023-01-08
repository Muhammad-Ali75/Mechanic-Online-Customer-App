import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../core/theme';

const SearchLocation = ({ term, onTermChange, onTermSubmit,}) => {
  return (
    <View style={styles.backgroundStyle}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="Search"
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 10,
    marginBottom:10,
    backgroundColor: '#E8DFDF',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: 'row',

  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
    paddingLeft:10,
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: 'center',
    marginHorizontal: 15
  }
});

export default SearchLocation;
