import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/rootReducer';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk'

export default () => {
    var store = createStore(rootReducer, applyMiddleware(thunk))

    return {store}
}