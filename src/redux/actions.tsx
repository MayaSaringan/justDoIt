import {Dispatch} from 'redux';
import Todo from '../data/Todo';

/* eslint-disable  import/prefer-default-export */

type BaseActionType = {
  type: string;
};
type ModifyListActionType = BaseActionType & {
  payload: {
    item: Todo;
    listID: string | null | undefined;
  };
};

export const addToList = (listID: string, toDo: Todo) => async (
  dispatch: Dispatch,
): Promise<ModifyListActionType> => {
  console.log('in action addToList');
  return dispatch({
    type: 'ADD_TO_LIST',
    payload: {
      item: toDo,
      listID,
    },
  });
};
