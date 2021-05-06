import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import rootReducer from './rootReducer';
import AsyncStorage from '@react-native-community/async-storage';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import { composeWithDevTools } from "remote-redux-devtools";
import configuredAxios from './services/helper';

const effect = (effect, action) => configuredAxios({...effect, data: effect.body})
const discard = (error, action, retries) => {
    const {req, res} = error
    if (!req) throw error
    if (!res) return false
    return 400 <= res.status && res.status < 500
}

const config = {
    ...offlineConfig,
    effect,
    discard
}

export default () => {
    var store = configureStore({reducer: rootReducer, devTools: true, enhancers:[offline(config)]})

    return {store}
}