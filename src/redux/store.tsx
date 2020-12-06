import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import ToDoReducer from './reducers/ToDoReducer';
import asyncStorageMiddleware from './middleware/AsyncStorageMiddleware';

const rootReducer = combineReducers({
  toDo: ToDoReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, asyncStorageMiddleware()),
);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
