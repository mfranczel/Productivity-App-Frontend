import axios from './helper'
import * as SecureStore from 'expo-secure-store';

export default {
    login: async (email, password) => {
        try {
            var res = await axios.post('/user/login', {email, password})
            await SecureStore.setItemAsync('token', res.data.token)
            return res.data.token
        } catch(err) {
            if (err.response.status == 400) {
                throw "Bad credentials"
            } else if (err.response.status == 500){
                throw "Server error occured"
            } else {
                throw err.message
            }
        }
    },
    register: async (email, password, birthDate) => {
        try {
            await axios.post('/user', {email: email, password: password, birthDate: birthDate})
            return true
        } catch (err) {
            if (err.response.status == 400) {
                throw "Information provided is invalid"
            } else if (err.response.status == 500){
                throw "Server error occured"
            } else {
                throw err.message
            }
        }
    },
    getProfile: async () => {
        const token = await SecureStore.getItemAsync('token');

        if (token){
            try {
                var res = await axios.get('/user', {headers: {"Authorization": `Bearer ${token}`}})
                if (res.status == 200) {
                    return res.data
                } else if (res.status == 400) {
                    throw "Information provided is invalid"
                } else {
                    throw "Server error occured"
                }
            } catch (err) {
                if (err.response.status == 200) {
                    return res.data
                } else if (err.response.status == 400) {
                    throw "Token is invalid"
                } else {
                    throw "Server error occured"
                }
            }
        } else {
            throw "User not signed in"
        }
    },
}