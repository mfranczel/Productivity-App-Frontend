import axios from './helper'
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export default {
    login: async (email, password) => {
        try {
            var res = await axios.post('/user/login', {email, password})

            if (Platform.OS !== 'web') {
                await SecureStore.setItemAsync('token', res.data.token)
            } else {
                localStorage.setItem('token', res.data.token)
            }

            return res.data.token
        } catch(err) {
            if (err.response) {
                if (err.response.status == 400 || err.response.status == 500) {
                    throw "Bad credentials"
                } else {
                    throw "Server error"
                }
            } else {
                throw "Other error"
            }
        }
    },
    register: async (email, password, birthDate) => {
        try {
            await axios.post('/user', {email: email, password: password, birthDate: birthDate})
        } catch (err) {
            throw "Bad info. provided"
        }
    },
    getImage: async() => {
        var token = ""
        if (Platform.OS !== 'web') {
            token = await SecureStore.getItemAsync('token');
        } else {
            token = localStorage.getItem('token')
        }

        
    },
    deleteProfile: async() => {
        var token = ""
        if (Platform.OS !== 'web') {
            token = await SecureStore.getItemAsync('token');
        } else {
            token = localStorage.getItem('token')
        }

        if (token){
            try {
                await axios.delete('/user', {headers: {"Authorization": `Bearer ${token}`}})
            } catch (e) {
                throw "Error while deleting profile"
            }
        } else {
            throw "User not signed in"
        }
    },
    changeProfile: async(email, password, birthdate) => {
        var token = ""
        if (Platform.OS !== 'web') {
            token = await SecureStore.getItemAsync('token');
        } else {
            token = localStorage.getItem('token')
        }

        if (token){
            try {
                await axios.put('/user', {
                    email: email,
                    password: password,
                    birthDate: birthdate
                }, {headers: {"Authorization": `Bearer ${token}`}})
            } catch (e) {
                throw "Error while changing data"
            }
        } else {
            throw "User not signed in"
        }

    },
    getProfile: async () => {
        var token = ""
        if (Platform.OS !== 'web') {
            token = await SecureStore.getItemAsync('token');
        } else {
            token = localStorage.getItem('token')
        }

        if (token){
            try {
                var res = await axios.get('/user', {headers: {"Authorization": `Bearer ${token}`}})
                res.data.token = token
                return res.data
            } catch (err) {
                if (err.response) {
                    if (err.response.status === 400) {
                        throw "Token is invalid"
                    } else {
                        throw "Server error occured"
                    }
                } else {
                    throw "Connection error"
                }
            }
        } else {
            throw "User not signed in"
        }
    }
}