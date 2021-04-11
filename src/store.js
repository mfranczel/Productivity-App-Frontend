import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer';
import AsyncStorage from '@react-native-community/async-storage';

export default () => {
    var store = configureStore({reducer: rootReducer})

    return {store}
}