import React from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, Text, TextInput, View, TouchableHighlight} from 'react-native';
import {withTheme, Portal, Modal,Button, RadioButton } from 'react-native-paper';
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
const connector = connect( (state: any) => {
  return {lists: state.toDo.lists};
}, actionCreators);

 
const AddItem = ({theme,lists, addToList, navigation}: any) => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const [listName, setListName] = React.useState(null)
  const [input, setInput]= React.useState(null)
  React.useEffect(() => {
    changeNavigationBarColor(theme.colors.primary, !theme.colors.dark, true);
  }, [theme.colors.primary, theme.colors.dark]);

  const submitInput = (evt: any) => {
    const item: string = evt.nativeEvent.text;
    setInput(item)
  };
  const goBack = () => {

    addToList(listName, new Todo(ID(), input));
    navigation.goBack();
  }
  console.log(lists)
  const containerStyle = {backgroundColor: theme.colors.primary, padding:20,};
  return (
    <>
      <Text>Add to-do Item:</Text>
      <TextInput style={styles.textInput} onSubmitEditing={submitInput} />
      <Text>Select List to add item to:</Text>
      <Text>{listName ? listName: 'unset'}</Text>
      <Portal style={{width:'50%'}}>
        <Modal visible={modalVisible} onDismiss={()=>setModalVisible(false)} contentContainerStyle={containerStyle}>
          <RadioButton.Group onValueChange={listName => setListName(listName)} value={listName}>
            { lists && Object.keys(lists).map((listID:any)=>{
              return (
                <RadioButton.Item label={listID} value={listID}   />
              )
            })}
          </RadioButton.Group>
        </Modal>
      </Portal>
      <TouchableHighlight style={{marginTop: 30}} onPress={()=>setModalVisible(true)}>
        <Text>Show</Text>
      </TouchableHighlight>
      <TouchableHighlight style={{marginTop: 30}} onPress={goBack}>
        <Text>Submit</Text>
      </TouchableHighlight>
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
