import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Loading: undefined;
  AddItem: undefined;
};

export type HomeScreenBaseProp = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  route: RouteProp<RootStackParamList, 'Home'>;
};

export type LoadingScreenBaseProp = {
  navigation: StackNavigationProp<RootStackParamList, 'Loading'>;
  route: RouteProp<RootStackParamList, 'Loading'>;
};

export type AddItemScreenBaseProp = {
  navigation: StackNavigationProp<RootStackParamList, 'AddItem'>;
  route: RouteProp<RootStackParamList, 'AddItem'>;
};

// TAB NAVIGATION STUFF
export type RootTabParamList = {
  Main: undefined;
  Lists: undefined;
  About: undefined;
};
