import { createStore, applyMiddleware,combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import {ReducerTicket} from './Reducers'
import functionP from './Sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  timeout: 0,
};
const reducers = combineReducers({
ReducerTicket
})
const persistedReducer = persistReducer(persistConfig, reducers);


export  const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
export const persistor = persistStore(store);

  sagaMiddleware.run(functionP);


