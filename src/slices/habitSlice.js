import { createSlice } from '@reduxjs/toolkit'
import HabitService from '../services/HabitService'

const initialState = {
    error: {message: ""},
    loading: false,
    habits: []
}

const habitSlice = createSlice({
    name: "habits",
    initialState,
    reducers: {
        setHabits(state, action) {
            var newState = Object.assign({}, state, {habits: action.payload} )
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


export const getHabits = () => async (dispatch) => {
    dispatch(habitSlice.actions.setLoading(true))
    try {
        var habits = await HabitService.getHabits()
        dispatch(habitSlice.actions.setHabits(habits))
    } catch (err) {
        dispatch(habitSlice.actions.setError(err.message))
    } finally {
        dispatch(habitSlice.actions.setLoading(false))
    }
}

export const addHabit = (habit) => async (dispatch) => {
    dispatch(habitSlice.actions.setLoading(true))
    try {
        await HabitService.addHabit(habit)
        var habits = await HabitService.getHabits()
        dispatch(habitSlice.actions.setHabits(habits))
    } catch (err) {
        dispatch(habitSlice.actions.setError(err.message))
    } finally {
        dispatch(habitSlice.actions.setLoading(false))
    }
}

export const removeHabit = (id) => async (dispatch) => {
    dispatch(habitSlice.actions.setLoading(true))
    try {
        await HabitService.removeHabit(id)
        var habits = await HabitService.getHabits()
        dispatch(habitSlice.actions.setHabits(habits))
    } catch (err) {
        dispatch(habitSlice.actions.setError(err.message))
    } finally {
        dispatch(habitSlice.actions.setLoading(false))
    }
}

export const completeHabit = (id) => async (dispatch) => {
    dispatch(habitSlice.actions.setLoading(true))
    try {
        await HabitService.completeHabit(id)
        var habits = await HabitService.getHabits()
        dispatch(habitSlice.actions.setHabits(habits))
    } catch (err) {
        dispatch(habitSlice.actions.setError(err.message))
    } finally {
        dispatch(habitSlice.actions.setLoading(false))
    }
}


export default habitSlice.reducer