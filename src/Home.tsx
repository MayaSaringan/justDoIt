/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar, View, Image} from 'react-native';

import {withTheme, Headline} from 'react-native-paper';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const App = ({theme}: any) => {
  React.useEffect(() => {
    changeNavigationBarColor(theme.colors.primary, !theme.colors.dark, true);
  }, [theme.colors.primary, theme.colors.dark]);
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
