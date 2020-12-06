import React from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, StatusBar, Image, SafeAreaView, View} from 'react-native';
import {Headline, withTheme} from 'react-native-paper';
import {connect} from 'react-redux';
import {addToList, getList} from './redux/actions';
import {LoadingScreenBaseProp} from './common/NavigationParamList';

const actionCreators = {
  addToList,
  getList,
};
type LoadingProp = LoadingScreenBaseProp & {
  theme: any;
};
const connector = connect(null, actionCreators);
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

export default withTheme(connector(LoadingScreen));
