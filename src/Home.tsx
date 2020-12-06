import React from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Image,
  FlatList,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Headline, withTheme, Title, List, IconButton} from 'react-native-paper';
import {Theme} from 'react-native-paper/lib/typescript/src/types';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {connect, ConnectedProps} from 'react-redux';
import {
  RootStackParamList,
  HomeScreenBaseProp,
  LoadingScreenBaseProp,
} from './common/NavigationParamList';
import {addToList} from './redux/actions';
import Todo from './data/Todo';

const RootStack = createStackNavigator<RootStackParamList>();
type MyTheme = Theme & {
  colors: {
    primaryLight: string;
    primaryDark: string;
  };
};

type LoadingProp = LoadingScreenBaseProp & {
  theme: MyTheme;
};

const actionCreators = {
  addToList,
};

const connector = connect((state: any) => {
  return {lists: state.toDo.lists};
}, actionCreators);
type PropsFromRedux = ConnectedProps<typeof connector>;
type HomeProp = HomeScreenBaseProp &
  PropsFromRedux & {
    theme: MyTheme;
  };

const HomeScreen = ({lists, theme /* navigation, addToList */}: HomeProp) => {
  React.useEffect(() => {
    changeNavigationBarColor(theme.colors.primaryDark, !theme.dark, true);
  }, [theme.colors.primaryDark, theme.dark]);
  // format the room items to the format the flat list expects

  const renderItem = ({item}: any) => {
    return (
      <List.Item
        style={[styles.listItem]}
        titleStyle={{color: theme.colors.onSurface}}
        title={item.item}
        right={() => {
          return (
            <IconButton
              icon="checkbox-blank-circle-outline"
              color={theme.colors.onSurface}
              size={20}
            />
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
        style={[styles.background, {backgroundColor: theme.colors.primary}]}>
        <Title
          style={{
            fontSize: 36,
            lineHeight: 36,
            alignItems: 'flex-start',
            width: '100%',
          }}>
          Todos
        </Title>
        {lists.map((list: any) => {
          const flatListData =
            list.items.length > 0
              ? list.items.map((item: Todo) => {
                  return {item: item.item};
                })
              : [];
          return (
            <FlatList
              key={list.listID}
              style={{width: '100%'}}
              keyExtractor={(item: any, index: number) => `list-item-${index}`}
              data={flatListData}
              renderItem={renderItem}
            />
          );
        })}
      </View>
    </>
  );
};
const LoadingScreen = ({theme, navigation}: LoadingProp) => {
  React.useEffect(() => {
    const loadPromise = () =>
      new Promise((res: any) => {
        setTimeout(() => res(), 500);
      });

    loadPromise().then(() => {
      navigation.navigate('Home');
    });
  }, [navigation]);
  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView>
        <View
          style={[styles.background, {backgroundColor: theme.colors.primary}]}>
          <Image
            // eslint-disable-next-line global-require
            source={require('./assets/justDoIt.png')}
            style={styles.logo}
          />
          <Headline>Welcome</Headline>
        </View>
      </SafeAreaView>
    </>
  );
};
const App = ({theme}: any) => {
  React.useEffect(() => {
    changeNavigationBarColor(theme.colors.primary, !theme.colors.dark, true);
  }, [theme.colors.primary, theme.colors.dark]);
  return (
    <>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: theme.colors.primary,
        }}>
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen
              name="Loading"
              component={withTheme(LoadingScreen)}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="Home"
              component={withTheme(connector(HomeScreen))}
              options={{headerShown: false}}
            />
          </RootStack.Navigator>
        </NavigationContainer>
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
});

export default withTheme(App);
