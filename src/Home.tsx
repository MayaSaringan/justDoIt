import React from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Image,
  Text,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Headline, withTheme} from 'react-native-paper';
import {Theme} from 'react-native-paper/lib/typescript/src/types';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {
  RootStackParamList,
  HomeScreenBaseProp,
  LoadingScreenBaseProp,
} from './common/NavigationParamList';

const RootStack = createStackNavigator<RootStackParamList>();
type MyTheme = Theme & {
  colors: {
    primaryLight: string;
    primaryDark: string;
  };
};
type HomeProp = HomeScreenBaseProp & {
  theme: MyTheme;
};
type LoadingProp = LoadingScreenBaseProp & {
  theme: MyTheme;
};
const HomeScreen = ({theme, navigation}: HomeProp) => {
  React.useEffect(() => {
    changeNavigationBarColor(theme.colors.primary, !theme.dark, true);
  }, [theme.colors.primary, theme.dark]);

  React.useEffect(() => {
    navigation.navigate('Loading');

    setTimeout(() => {
      /* filler */
    }, 2000);

    const loadPromise = () =>
      new Promise((res: any) => {
        setTimeout(() => res(), 2000);
      });

    loadPromise().then(() => {
      navigation.goBack();
    });
  }, [navigation]);
  return (
    <>
      <Text>Loaded</Text>
    </>
  );
};
const LoadingScreen = ({theme}: LoadingProp) => {
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
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name="Home"
            component={withTheme(HomeScreen)}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="Loading"
            component={withTheme(LoadingScreen)}
            options={{headerShown: false}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    padding: 8,
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
});

export default withTheme(App);
