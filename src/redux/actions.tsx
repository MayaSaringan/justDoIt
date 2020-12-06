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
type GetListActionType = BaseActionType;
export const addToList = (listID: string, toDo: Todo) => async (
  dispatch: Dispatch,
): Promise<ModifyListActionType> => {
  return dispatch({
    type: 'ADD_TO_LIST',
    payload: {
      item: toDo,
      listID,
    },
  });
};

export const getList = () => async (
  dispatch: Dispatch,
): Promise<GetListActionType> => {
  return dispatch({
    type: 'GET_LIST',
  });
};
export const deleteItem = (listID: string, toDo: Todo) => async (
  dispatch: Dispatch,
): Promise<ModifyListActionType> => {
  return dispatch({
    type: 'DELETE_ITEM',
    payload: {
      listID,
      item: toDo,
    },
  });
};
