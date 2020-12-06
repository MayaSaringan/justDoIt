import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Theme} from 'react-native-paper/lib/typescript/src/types';
import {Provider as ReduxProvider} from 'react-redux';
import Home from './Home';
import store from './redux/store';

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
                <App />
              </PaperProvider>
            </ReduxProvider>
          );
        }}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
};
const App = () => {
  return (
    <>
      <Home />
    </>
  );
};

export default Main;
