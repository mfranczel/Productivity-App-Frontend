import { createStore } from 'redux'
import rootReducer from './reducers/rootReducer';
import AsyncStorage from '@react-native-community/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    var store = createStore(persistedReducer)
    var persistor = persistStore(store)

    return {store, persistor}
}