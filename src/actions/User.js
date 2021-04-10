import axios from './helper'


function loginSuccess(token) { return { type: "LOGIN_SUCCESS", payload: {auth: true, token}}}
function registerSuccess() { return { type: "REGISTER_SUCCESS", payload: {auth: false, token: null}}}
function loginError() { return { type: "LOGIN_ERROR", payload: {auth: false, token: null}}}
function serverError() { return { type: "SERVER_ERROR", payload: {auth: false, token: null}}}
function connectionError() { return { type: "CONNECTION_ERROR", payload: {auth: false, token: null}}}


export default {
    login: (email, password) => {
        return dispatch => {
            axios.post('/user/login', {email, password})
                .then(res => {
                    if (res.status == 200) {
                        dispatch(loginSuccess(res.data.token))
                    } else if (res.status == 400) {
                        dispatch(loginError())
                    } else {
                        dispatch(serverError())
                    }
                })
                .catch(err => {
                    dispatch(connectionError())
                })
        }
    },
    register: (email, password, birthDate) => {
        return dispatch => {
            axios.post('/user', {email, password, birthDate})
                .then(res => {
                    if (res.status == 200) {
                        dispatch(registerSuccess())
                    } else if (res.status == 400) {
                        dispatch(loginError())
                    } else {
                        dispatch(serverError())
                    }
                })
                .catch(err => {
                    dispatch(connectionError())
                })
        }
    }
}