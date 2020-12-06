/*
 * Manages alterations to room state
 */
import Todo from '../../data/Todo';

export interface ListsState {
  lists: any;
}
const initialState: ListsState = {
  lists: [
    {
      listID: 'testing',
      items: [
        new Todo('0', 'Make super cool app'),
        new Todo('0', 'Publish super cool app to playstore'),
      ],
    },
  ],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case 'UPDATE_ROOM_ITEMS': {
      return {
        ...state,
        lists: action.payload.items,
      };
    }
    default:
      return state;
  }
}
