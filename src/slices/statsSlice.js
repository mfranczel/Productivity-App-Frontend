import { createSlice } from '@reduxjs/toolkit'
import StatsService from '../services/StatsService'

const initialState = {
    error: {message: ""},
    loading: false,
    stats: []
}
 
const statsSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {
        setStats(state, action) {
            var newState = Object.assign({}, state, {stats: action.payload})
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

export const getStats = (selectedIndex) => async (dispatch) => {
    dispatch(statsSlice.actions.setLoading(true))
    try {
        var stats = await StatsService.getStatsDaily(selectedIndex)
        dispatch(statsSlice.actions.setStats(stats))
    } catch (err) {
        dispatch(statsSlice.actions.setError(err.message))
    } finally {
        dispatch(statsSlice.actions.setLoading(false))
    }
}

export default statsSlice.reducer