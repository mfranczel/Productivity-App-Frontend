import { createSlice } from '@reduxjs/toolkit'
import HabitService from '../services/HabitService'
import {store} from '../App'

const initialState = {
    error: {message: ""},
    loading: false,
    habits: []
}

const habitSlice = createSlice({
    name: "habits",
    initialState,
    reducers: {
        deleteHabit: {
            reducer: (state, action) => {
                var id = action.payload
                var newState = {...state}
                var habits = [...newState.habits]
                
                habits = habits.filter(h => h.id !== id)

                newState.habits = habits
                return newState
            },
            prepare: (id) => {
                var token = store.getState().user.token
                var meta = {
                    offline: {
                        effect: { url: `/habit/${id}`, method: "DELETE", headers: {"Authorization": `Bearer ${token}`}},
                        commit: { type: 'habits/commitHabitRemoval'},
                        rollback: { type: 'habits/rollbackHabitRemoval' }
                    }
                }
                return { meta, payload: id }
            }
        },
        completeHabit: {
            reducer: (state, action) => {
                var id = action.payload
                var newState = {...state}
                var habits = [...newState.habits]
                var h = {...habits.find(h => h.id === id)}
                var habit_day_dones = [...h.habit_day_dones]
                habit_day_dones.push({
                    date: (new Date()).toISOString()
                })
                h.habit_day_dones = habit_day_dones
                habits = habits.filter(s => s.id !== id)
                habits.push(h)
                newState.habits = habits
                return newState
            },
            prepare: (id) => {
                var token = store.getState().user.token
                var meta = {
                    offline: {
                        effect: { url: `/habit/${id}`, body: {action: "complete"}, method: "POST", headers: {"Authorization": `Bearer ${token}`}},
                        commit: { type: 'habits/commitHabitCompletion'},
                        rollback: { type: 'habits/rollbackHabitCompletion' }
                    }
                }
                return { meta, payload: id }
            }
        },
        setHabits: {
            reducer: (state) => {
                return state
            },
            prepare: () => {
                var token = store.getState().user.token
                var meta = {
                    offline: {
                        effect: { url: '/habit', method: "GET", headers: {"Authorization": `Bearer ${token}`}},
                        commit: { type: 'habits/commitHabits'}
                    }
                }
                return { meta }
            }
        },
        addHabit: {
            reducer: (state, action) => {
                action.payload.habit_day_dones = []
                action.payload.id = state.habits.length > 0 ? state.habits[state.habits.length-1].id + 1 : 1
                action.payload.synced = false
                var newState = {...state, habits: [...state.habits, action.payload]}
                return newState
            },
            prepare: (habit) => {
                var token = store.getState().user.token
                var meta = {
                    offline: {
                        effect: { url: '/habit', method: "POST", body: habit, headers: {"Authorization": `Bearer ${token}`, 'Content-Type': 'application/json'} },
                        commit: { type: 'habits/commitHabitAddition' },
                        rollback: { type: 'habits/rollbackHabitAddition', meta: { habit } }
                    }
                }
                return { meta, payload: habit }
            }
        },
        commitHabitCompletion: (state, action) => {
            console.log("COMMIT COMPLETION")
            return state
        },
        rollbackHabitCompletion: (state, action) => {
            console.log("ROLLBACK COMPLETION")
            return state
        },
        commitHabitRemoval: (state, action) => {
            console.log("COMMIT REMOVAL")
            return state
        },
        rollbackHabitRemoval: (state, action) => {
            console.log("ROLLBACK REMOVAL")
            return state
        },
        commitHabits: (state, action) => {
            console.log("COMMIT HABITS ")
            var newState = Object.assign({}, state, {habits: action.payload.data} )
            return newState
        },
        commitHabitAddition: (state, action) => {
            return state
        },
        rollbackHabitAddition: (state, action) => {
            console.log("ROLLBACK HABIT")
            return state
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
        dispatch(habitSlice.actions.setHabits())
    } catch (err) {
        dispatch(habitSlice.actions.setError(err.message))
    } finally {
        dispatch(habitSlice.actions.setLoading(false))
    }
}

export const addHabit = (habit) => async (dispatch) => {
    dispatch(habitSlice.actions.setLoading(true))
    try {
        dispatch(habitSlice.actions.addHabit(habit))
        dispatch(habitSlice.actions.setHabits())
    } catch (err) {
        dispatch(habitSlice.actions.setError(err.message))
    } finally {
        dispatch(habitSlice.actions.setLoading(false))
    }
}

export const removeHabit = (id) => async (dispatch) => {
    dispatch(habitSlice.actions.setLoading(true))
    try {
        dispatch(habitSlice.actions.deleteHabit(id))
    } catch (err) {
        dispatch(habitSlice.actions.setError(err.message))
    } finally {
        dispatch(habitSlice.actions.setLoading(false))
    }
}

export const completeHabit = (id) => async (dispatch) => {
    dispatch(habitSlice.actions.setLoading(true))
    try {
        dispatch(habitSlice.actions.completeHabit(id))
        dispatch(habitSlice.actions.setHabits())
    } catch (err) {
        dispatch(habitSlice.actions.setError(err.message))
    } finally {
        dispatch(habitSlice.actions.setLoading(false))
    }
}


export default habitSlice.reducer