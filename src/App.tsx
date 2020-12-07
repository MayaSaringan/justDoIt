import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  withTheme,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import {Theme} from 'react-native-paper/lib/typescript/src/types';
import {Provider as ReduxProvider} from 'react-redux';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './Home';
import AddItem from './AddItem';
import LoadingScreen from './Launch';
import {
  RootStackParamList,
  RootTabParamList,
} from './common/NavigationParamList';
import ListsScreen from './Lists';
import store from './redux/store';

const RootStack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();
type MyTheme = Theme & {
  colors: {
    primaryLight: string;
    primaryDark: string;
  };
};
type ThemeSelectorType = {
  dark?: MyTheme;
  light?: MyTheme;
};
const theme: ThemeSelectorType = {
  dark: {
    ...DefaultTheme,
    dark: true,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#006cb0',
      primaryLight: '#66cbff',
      primaryDark: '#66cbff',
      accent: '#9349cb',
      surface: 'white',
      onBackground: 'white',
      text: 'white',
      onSurface: 'black',
    },
    mode: 'adaptive',
  },
  light: {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#199ce0',
      primaryLight: '#66cbff',
      primaryDark: '#006cb0',
      accent: '#c778ff',
      surface: '#f5f5f2',
      onBackground: 'white',
      text: 'white',
      onSurface: 'black',
    },
  },
};
type ThemeType = {
  theme: MyTheme | undefined;
};
const ThemeContext = React.createContext<ThemeType>({theme: undefined});

const ThemeProvider = ({children}: React.PropsWithChildren<{}>) => {
  return (
    <ThemeContext.Provider value={{theme: theme.light}}>
      {children}
    </ThemeContext.Provider>
  );
};
const Main = () => {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {(value: ThemeType) => {
          return (
            <ReduxProvider store={store}>
              <PaperProvider theme={value.theme}>
                <ThemedApp />
              </PaperProvider>
            </ReduxProvider>
          );
        }}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
};

const HomeStack = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="AddItem"
        component={AddItem}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
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
          <Tab.Navigator>
            <Tab.Screen name="Main" component={HomeStack} />
            <Tab.Screen name="Lists" component={ListsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
};
const ThemedApp = withTheme(App);

export default Main;
