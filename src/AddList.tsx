import React from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {withTheme, Portal, Modal,Button, RadioButton } from 'react-native-paper';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {connect} from 'react-redux';
import {addList} from './redux/actions';
import Todo from './data/Todo';

const actionCreators = {
  addList,
};
const ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return `_${Math.random().toString(36).substr(2, 9)}`;
};
const connector = connect( (state: any) => {
  return {lists: state.toDo.lists};
}, actionCreators);

 
const AddList = ({theme,lists, addList, navigation}: any) => { 
  React.useEffect(() => {
    changeNavigationBarColor(theme.colors.primary, !theme.colors.dark, true);
  }, [theme.colors.primary, theme.colors.dark]);

  const submitInput = (evt: any) => {
    const list: string = evt.nativeEvent.text;
     addList(list);
    navigation.goBack();
  };
  console.log(lists) 
  return (
    <>
      <Text>Add to-do list:</Text>
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

export default withTheme(connector(AddList));
