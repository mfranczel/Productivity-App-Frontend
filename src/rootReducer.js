import { combineReducers } from "redux"
import taskSlice from "./slices/taskSlice"
import userReducer from './slices/userSlice'

export default combineReducers({
    user: userReducer,
    tasks: taskSlice
})