import UserService from '../services/UserService'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
    isLoading: false,
    error: {message: ""},
    currentUser: null
}

const userSlice = createSlice({
    name: "advisor",
    initialState,
    reducers: {
        setAuthSuccess(state, action) {
            var newState = {...state}
            newState.isAuth = true
            newState.currentUser = action.payload
            return newState
        },
        setAuthFailed(state, action) {
            var newState = {...state}
            newState.isAuth = false
            newState.error = {message: action.payload}
            return newState
        },
        setLoading(state, action) {
            var newState = {...state}
            newState.isLoading = action.payload
            return newState
        },
        logout(state) {
            var newState = {...state}
            newState.isAuth = false
            newState.currentUser = undefined
            return newState
        }
    }
})


export const login = (email, password) => async (dispatch) => {
    dispatch(userSlice.actions.setLoading(true))
    try {
        var token = await UserService.login(email, password)
        var account = await UserService.getProfile(token)
        dispatch(userSlice.actions.setAuthSuccess(account))
    } catch(err) {
        dispatch(userSlice.actions.setAuthFailed(err))
    } finally {
        dispatch(userSlice.actions.setLoading(false))
    }
}


export const getProfile = () => async (dispatch) => {
    dispatch(userSlice.actions.setLoading(true))
    try {
        var account = await UserService.getProfile()
        dispatch(userSlice.actions.setAuthSuccess(account))
    } catch (err) {
        console.log(err)
        dispatch(userSlice.actions.setAuthFailed(err))
    } finally {
        dispatch(userSlice.actions.setLoading(false))
    }
}

/*
export const setProfile = (profile) => async (dispatch) => {
    dispatch(userSlice.actions.setLoading(true))
    try {
        await UserService.setProfile(profile, token)
        dispatch(userSlice.actions.setAuthSuccess(profile))
    } catch (err) {
        dispatch(userSlice.actions.setAuthFailed(err))
    } finally {
        dispatch(userSlice.actions.setLoading(false))
    }
}*/

export default userSlice.reducer