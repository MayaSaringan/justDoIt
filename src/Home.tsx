import React from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, StatusBar, View, FlatList} from 'react-native';
import {withTheme, Title, List, IconButton, FAB} from 'react-native-paper';
import {Theme} from 'react-native-paper/lib/typescript/src/types';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {connect, ConnectedProps} from 'react-redux';
import {HomeScreenBaseProp} from './common/NavigationParamList';
import {addToList, getList, deleteItem} from './redux/actions';

type MyTheme = Theme & {
  colors: {
    primaryLight: string;
    primaryDark: string;
  };
};

const actionCreators = {
  addToList,
  getList,
  deleteItem,
};

const connector = connect((state: any) => {
  return {lists: state.toDo.lists};
}, actionCreators);
type PropsFromRedux = ConnectedProps<typeof connector>;
type HomeProp = HomeScreenBaseProp &
  PropsFromRedux & {
    theme: MyTheme;
  };

const HomeScreen = ({
  lists,
  theme,
  navigation,
  getList,
  deleteItem,
}: HomeProp) => {
  React.useEffect(() => {
    changeNavigationBarColor(theme.colors.primaryDark, !theme.dark, true);
    getList();
  }, [theme.colors.primaryDark, theme.dark, getList]);

  const renderItem = ({item}: any) => {
    return (
      <List.Item
        style={[styles.listItem]}
        titleStyle={{color: theme.colors.onSurface}}
        title={item.item}
        right={() => {
          return (
            <>
              <IconButton
                icon="checkbox-blank-circle-outline"
                color={theme.colors.onSurface}
                size={20}
              />
              <IconButton
                icon="delete"
                color={theme.colors.onSurface}
                size={20}
                onPress={() => deleteItem('uncategorized', item)}
              />
            </>
          );
        }}
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
          Todos
        </Title>
        {lists &&
          Object.keys(lists).map((listID: any) => {
            console.log(listID);
            const list = lists[listID];
            if (lists[listID]) {
              const flatListData =
                Object.keys(list.items).length > 0
                  ? Object.keys(list.items).map((itemID: any) => {
                      return {item: list.items[itemID].item, id: itemID};
                    })
                  : [];
              return (
                <FlatList
                  key={listID}
                  style={{width: '100%', flexGrow: 0}}
                  keyExtractor={(item: any, index: number) =>
                    `list-item-${index}`
                  }
                  data={flatListData}
                  renderItem={renderItem}
                />
              );
            }
            return null;
          })}
        <FAB
          style={styles.fab}
          small
          label="Add"
          icon="plus"
          onPress={() => {
            navigation.navigate('AddItem');
          }}
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

export default withTheme(connector(HomeScreen));
