import { createSlice } from '@reduxjs/toolkit'
import TaskService from '../services/TaskService'
// 

// 
const initialState = {
    error: {message: ""},
    loading: false,
    tasks: []
}
 
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

export const getTasks = (selectedIndex) => async (dispatch) => {
    dispatch(taskSlice.actions.setLoading(true))
    try {
        var tasks = await TaskService.getTasks(selectedIndex)
        dispatch(taskSlice.actions.setTasks(tasks))
    } catch (err) {
        dispatch(taskSlice.actions.setError(err.message))
    } finally {
        dispatch(taskSlice.actions.setLoading(false))
    }
}


export const getTasksDaily = () => async (dispatch) => {
    dispatch(taskSlice.actions.setLoading(true))
    try {
        var tasks = await TaskService.getTasks('/todo/monthly')
        dispatch(taskSlice.actions.setTasks(tasks))
    } catch (err) {
        dispatch(taskSlice.actions.setError(err.message))
    } finally {
        dispatch(taskSlice.actions.setLoading(false))
    }
}


export const getTasksWeekly = () => async (dispatch) => {
    dispatch(taskSlice.actions.setLoading(true))
    try {
        var tasks = await TaskService.getTasks('/todo/monthly')
        dispatch(taskSlice.actions.setTasks(tasks))
    } catch (err) {
        dispatch(taskSlice.actions.setError(err.message))
    } finally {
        dispatch(taskSlice.actions.setLoading(false))
    }
}

export const getTasksMonthly = () => async (dispatch) => {
    dispatch(taskSlice.actions.setLoading(true))
    try {
        var tasks = await TaskService.getTasks('/todo/monthly')
        dispatch(taskSlice.actions.setTasks(tasks))
    } catch (err) {
        dispatch(taskSlice.actions.setError(err.message))
    } finally {
        dispatch(taskSlice.actions.setLoading(false))
    }
}

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
export const removeTask = (id, seletcIndex) => async (dispatch) => {
    dispatch(taskSlice.actions.setLoading(true))
    try {

        if (seletcIndex === 'daily'){
            seletcIndex = 0
        } else if (seletcIndex === 'weekly') {
            seletcIndex = 1
        } else {
            seletcIndex = 2
        }

        await TaskService.removeTask(id)
        var tasks = await TaskService.getTasks(seletcIndex)
        dispatch(taskSlice.actions.setTasks(tasks))
    } catch (err) {
        dispatch(taskSlice.actions.setError(err.message))
    } finally {
        dispatch(taskSlice.actions.setLoading(false))
    }
}

export const completeTask = (id, seletcIndex) => async (dispatch) => {
    dispatch(taskSlice.actions.setLoading(true))
    try {
        if (seletcIndex === 'daily'){
            seletcIndex = 0
        } else if (seletcIndex === 'weekly') {
            seletcIndex = 1
        } else {
            seletcIndex = 2
        }
        await TaskService.promoteTask(id)
        var tasks = await TaskService.getTasks(seletcIndex)
        dispatch(taskSlice.actions.setTasks(tasks))
    } catch (err) {
        dispatch(taskSlice.actions.setError(err.message))
    } finally {
        dispatch(taskSlice.actions.setLoading(false))
    }
}

export default taskSlice.reducer