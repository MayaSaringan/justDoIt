import {Middleware} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const middleware = (): Middleware<{}, any> => {
  console.log('AsyncStorage middleare');
  return ({dispatch, getState}) => (next) => (action) => {
    console.log('middleware');
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    // perform side logic if any of the cases are fullfilled
    switch (action.type) {
      case 'ADD_TO_LIST': {
        // Return status of attempt
        // Must be a promise, as we need to wait for a response.
        console.log('Adding to list');

        const obj = {
          [action.payload.listID]: {
            items: {
              [action.payload.item.id]: {
                item: [action.payload.item.item],
              },
            },
          },
        };
        return AsyncStorage.setItem(`@lists`, JSON.stringify(obj))
          .then(async () => {
            try {
              const jsonValue = await AsyncStorage.getItem('@lists');
              const json = jsonValue != null ? JSON.parse(jsonValue) : null;
              console.log(JSON.stringify(json));
              next({type: 'UPDATE_ROOM_ITEMS', payload: {items: []}});
            } catch (e) {
              console.log('ERR');
              // read error
            }
            return next({type: 'LIST_OPERATION_SUCCESS'});
          })
          .catch((err: any) => {
            return next({type: 'LIST_OPERATION_FAILURE', result: err});
          });
      }
      default:
        return next(action);
    }
  };
};

export default middleware;
