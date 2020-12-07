import React from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, StatusBar, View, FlatList} from 'react-native';
import {withTheme, Title, List} from 'react-native-paper';
import {connect} from 'react-redux';

const connector = connect((state: any) => {
  return {lists: state.toDo.lists};
}, null);

const ListsScreen = ({lists, theme}: any) => {
  const flatListData = lists
    ? Object.keys(lists).map((listID: any) => {
        return {
          listID,
          numItems: Object.keys(lists[listID].items).length,
        };
      })
    : [];

  const renderItem = ({item}: any) => {
    return (
      <List.Item
        style={[styles.listItem]}
        titleStyle={{color: theme.colors.onSurface}}
        descriptionStyle={{color: theme.colors.onSurface}}
        title={item.listID}
        description={`Number of items: ${item.numItems}`}
      />
    );
  };
  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <View
        style={[
          styles.background,
          {backgroundColor: theme.colors.primary, justifyContent: 'flex-start'},
        ]}>
        <Title
          style={{
            fontSize: 36,
            lineHeight: 36,
            alignItems: 'flex-start',
            width: '100%',
          }}>
          Lists
        </Title>
        <FlatList
          style={{width: '100%', flexGrow: 0}}
          keyExtractor={(item: any, index: number) => `list-item-${index}`}
          data={flatListData}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    padding: 28,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  logo: {
    width: '50%',
    height: 200,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  listItem: {
    margin: 5,
    flexDirection: 'column',
    fontSize: 18,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  fab: {
    alignSelf: 'flex-end',
  },
});

export default withTheme(connector(ListsScreen));
