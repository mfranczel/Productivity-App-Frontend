import { combineReducers } from "redux"

import taskSlice from "./slices/taskSlice"
import habitSlice from "./slices/habitSlice"
import userReducer from './slices/userSlice'
import statsSlice from './slices/statsSlice'

export default combineReducers({
    user: userReducer,
    tasks: taskSlice,
    stats: statsSlice,
    habits: habitSlice
})