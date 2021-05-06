import UserService from '../services/UserService'
import { createSlice } from '@reduxjs/toolkit'
import {store} from '../App'

const initialState = {
    isAuth: false,
    isLoading: false,
    error: {message: ""},
    currentUser: null,
    token: ""
}

const userSlice = createSlice({
    name: "advisor",
    initialState,
    reducers: {
        changeProfile: {
            reducer: (state, action) => {
                var profile = action.payload
                var profileState = {...state.currentUser}
                profileState.email = profile.email
                profileState.password = profile.password
                profileState.birth_date = profile.birthDate
                var newState = {...state}
                newState.currentUser = profileState
                return newState
            },
            prepare: (profile) => {
                var token = store.getState().user.token
                var meta = {
                    offline: {
                        effect: { url: `/user`, body: profile, method: "PUT", headers: {"Authorization": `Bearer ${token}`}},
                        commit: { type: 'habits/commitProfileChange'},
                    }
                }
                return { meta, payload: profile}
            }
        },
        commitProfileChange(state, action) {
            return state
        },
        setAuthSuccess(state, action) {
            var newState = {...state}
            newState.isAuth = true
            newState.currentUser = action.payload
            newState.token = action.payload.token
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
            newState.currentUser = {}
            newState.token = null
            return newState
        },
        setToken(state, action) {
            var newState = {...state}
            newState.token = action.payload
            return newState
        }
    }
})


export const login = (email, password) => async (dispatch) => {
    dispatch(userSlice.actions.setLoading(true))
    try {
        var token = await UserService.login(email, password)
        var account = await UserService.getProfile(token)
        account.token = token
        dispatch(userSlice.actions.setAuthSuccess(account))
    } catch(err) {
        dispatch(userSlice.actions.setAuthFailed(err))
    } finally {
        dispatch(userSlice.actions.setLoading(false))
    }
}

export const logout = () => async (dispatch) => {
    dispatch(userSlice.actions.logout())
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


export const changeProfile = (email, password, birthdate) => async (dispatch) => {
    dispatch(userSlice.actions.setLoading(true))
    try {
        dispatch(userSlice.actions.changeProfile({email, password, birthDate: birthdate}))
    } catch (e) {
        console.log(e)
    } finally {
        dispatch(userSlice.actions.setLoading(false))
    }
}

export const deleteProfile = () => async (dispatch) => {
    dispatch(userSlice.actions.setLoading(true))
    try {
        await UserService.deleteProfile()
        dispatch(userSlice.actions.logout())
    } catch (e) {
        console.log(e)
    } finally {
        dispatch(userSlice.actions.setLoading(false))
    }
}

export const setToken = (token) => async (dispatch) => {
    dispatch(userSlice.actions.setToken(token))

}

export default userSlice.reducer