import { createSlice } from '@reduxjs/toolkit'
import TaskService from '../services/TaskService'
// 

// 
const initialState = {
    error: {message: ""},
    loading: false,
    tasks: []
}

// 
const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasks(state, action) {
            var newState = Object.assign({}, state, {tasks: action.payload})
            return newState
        },
        setLoading(state, action) {
            var newState = {...state, loading: action.payload}
            return newState
        },
        setError(state, action) {
            var newState = {...state, error: {message: action.payload}}
            return newState
        }
    }
})

// 
export const getTasks = () => async (dispatch) => {
    dispatch(taskSlice.actions.setLoading(true))
    try {
        var tasks = await TaskService.getTasks()
        dispatch(taskSlice.actions.setTasks(tasks))
    } catch (err) {
        dispatch(taskSlice.actions.setError(err.message))
    } finally {
        dispatch(taskSlice.actions.setLoading(false))
    }
}
// 
export const addTask = (task) => async (dispatch) => {
    dispatch(taskSlice.actions.setLoading(true))
    try {
        await TaskService.addTask(task)
        var tasks = await TaskService.getTasks()
        dispatch(taskSlice.actions.setTasks(tasks))
    } catch (err) {
        dispatch(taskSlice.actions.setError(err.message))
    } finally {
        dispatch(taskSlice.actions.setLoading(false))
    }
}

// 
export const removeTask = (id) => async (dispatch) => {
    dispatch(taskSlice.actions.setLoading(true))
    try {
        await TaskService.removeTask(id)
        var tasks = await TaskService.getTasks()
        dispatch(taskSlice.actions.setTasks(tasks))
    } catch (err) {
        dispatch(taskSlice.actions.setError(err.message))
    } finally {
        dispatch(taskSlice.actions.setLoading(false))
    }
}

// export const completeHabit = (id) => async (dispatch) => {
//     dispatch(habitSlice.actions.setLoading(true))
//     try {
//         await HabitService.completeHabit(id)
//         var habits = await HabitService.getHabits()
//         dispatch(habitSlice.actions.setHabits(habits))
//     } catch (err) {
//         dispatch(habitSlice.actions.setError(err.message))
//     } finally {
//         dispatch(habitSlice.actions.setLoading(false))
//     }
// }


export default taskSlice.reducer