import { combineReducers } from "redux"

import taskSlice from "./slices/taskSlice"
import habitSlice from "./slices/habitSlice"
import userReducer from './slices/userSlice'

export default combineReducers({
    user: userReducer,
    tasks: taskSlice,
    habits: habitSlice
})