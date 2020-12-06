export interface ListsState {
  lists: any;
}
const initialState: ListsState = {
  lists: {},
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case 'UPDATE_ROOM_ITEMS': {
      return {
        ...state,
        lists: action.payload.lists,
      };
    }
    default:
      return state;
  }
}
