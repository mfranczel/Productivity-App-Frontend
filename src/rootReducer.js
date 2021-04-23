import { combineReducers } from "redux"
import habitSlice from "./slices/habitSlice"
import userReducer from './slices/userSlice'

export default combineReducers({
    user: userReducer,
    habits: habitSlice
})