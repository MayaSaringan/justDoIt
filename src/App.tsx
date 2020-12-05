import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Theme} from 'react-native-paper/lib/typescript/src/types';
import Home from './Home';

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
      surface: '#2b3136',
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
            <PaperProvider theme={value.theme}>
              <App />
            </PaperProvider>
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
