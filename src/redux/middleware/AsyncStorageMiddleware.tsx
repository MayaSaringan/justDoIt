import {Middleware} from 'redux';
import {
  clearAllData,
  getFromStorage,
  addList,
  addItemToList,
  deleteItemFromStorage,
} from './AsyncStorageHelper';

/*
 * The middleware delegates to the above methods the job of manipulating the async storage.
 * The middleware then forwards the success/failure of these methods as an action
 */
const middleware = (): Middleware<{}, any> => {
  /** ****** NEXT LINE IS FOR TESTING:  ******** */
 clearAllData();
  console.log('AsyncStorage middleware added.');
  return ({dispatch, getState}) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    switch (action.type) {
      case 'ADD_LIST':
        console.log('Adding a list');
        return addList(action.payload.listID )
          .then((listsData: any) => {
            next({
              type: 'UPDATE_ROOM_ITEMS',
              payload: {
                lists: listsData,
              },
            });
            return next({type: 'LIST_OPERATION_SUCCESS'});
          })
          .catch((err: any) => {
            return next({type: 'LIST_OPERATION_FAILURE', result: err});
          });
      case 'ADD_TO_LIST':
        console.log('Adding to list');
        return addItemToList(action.payload.listID, action.payload.item)
          .then((listsData: any) => {
            next({
              type: 'UPDATE_ROOM_ITEMS',
              payload: {
                lists: listsData,
              },
            });
            return next({type: 'LIST_OPERATION_SUCCESS'});
          })
          .catch((err: any) => {
            return next({type: 'LIST_OPERATION_FAILURE', result: err});
          });
      case 'DELETE_ITEM':
        console.log('Deleting from list');
        return deleteItemFromStorage(
          action.payload.listID,
          action.payload.item.id,
        )
          .then((listsData: any) => {
            next({
              type: 'UPDATE_ROOM_ITEMS',
              payload: {
                lists: listsData,
              },
            });
            return next({type: 'LIST_OPERATION_SUCCESS'});
          })
          .catch((err: any) => {
            return next({type: 'LIST_OPERATION_FAILURE', result: err});
          });
      case 'GET_LIST': {
        console.log('Getting list');
        return getFromStorage(`@lists`)
          .then((listsData: any) => {
            next({
              type: 'UPDATE_ROOM_ITEMS',
              payload: {
                lists: listsData,
              },
            });
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
