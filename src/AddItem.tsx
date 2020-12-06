import React from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, Text, TextInput} from 'react-native';
import {withTheme} from 'react-native-paper';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {connect} from 'react-redux';
import {addToList} from './redux/actions';
import Todo from './data/Todo';

const actionCreators = {
  addToList,
};
const ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return `_${Math.random().toString(36).substr(2, 9)}`;
};
const connector = connect(null, actionCreators);
const AddItem = ({theme, addToList, navigation}: any) => {
  React.useEffect(() => {
    changeNavigationBarColor(theme.colors.primary, !theme.colors.dark, true);
  }, [theme.colors.primary, theme.colors.dark]);

  const submitInput = (evt: any) => {
    const item: string = evt.nativeEvent.text;
    addToList('uncategorized', new Todo(ID(), item));
    navigation.goBack();
  };
  return (
    <>
      <Text>Add to-do Item:</Text>
      <TextInput style={styles.textInput} onSubmitEditing={submitInput} />
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: 200,
    borderBottomWidth: 0.8,
  },
});

export default withTheme(connector(AddItem));
