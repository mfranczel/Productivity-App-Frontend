import axios from './helper'
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export default {
    getTasks: async (path) => { 
        var token = ""
        if (Platform.OS !== 'web') {
            token = await SecureStore.getItemAsync('token');
        } else {
            token = localStorage.getItem('token')
        }
        if (token){
            try {
                // for now it is fixed -- daily
                if (path === 0){
                    var res = await axios.get('/todo/daily', {headers: {"Authorization": `Bearer ${token}`}})
                }else if (path === 1){
                    var res = await axios.get('/todo/weekly', {headers: {"Authorization": `Bearer ${token}`}})
                }else{
                    var res = await axios.get('/todo/monthly', {headers: {"Authorization": `Bearer ${token}`}})
                }
                return res.data
            } catch(e) {
                if (e.response) {
                    if (error.response.status == 500) {
                        throw "Server error"
                    } else {
                        throw "Unknown error"
                    }
                } else if (e.request) {
                    throw "Cannot reach server"
                } else {
                    throw "App error"
                }
            }
        } else {
            throw "User not logged in"
        }
    },
    addTask: async (task) => {
        var token = ""
        if (Platform.OS !== 'web') {
            token = await SecureStore.getItemAsync('token');
        } else {
            token = localStorage.getItem('token')
        }
        if (token){ 
            try {
                // if problem change todo to task
                await axios.post('todo', task, {headers: {"Authorization": `Bearer ${token}`}})
            } catch (e) {
                if (e.response) {
                    if (error.response.status == 500) {
                        throw "Server error"
                    } else {
                        throw "Unknown error"
                    }
                } else if (e.request) {
                    throw "Cannot reach server"
                } else {
                    throw "App error"
                }
            }
        } else {
            throw "User not logged in"
        }
    },
    removeTask: async (id) => {
        var token = ""
        if (Platform.OS !== 'web') {
            token = await SecureStore.getItemAsync('token');
        } else {
            token = localStorage.getItem('token')
        }
        if (token){ 
            try {
                await axios.delete('todo/' + id, {headers: {"Authorization": `Bearer ${token}`}})
            } catch (e) {
                if (e.response) {
                    if (error.response.status == 500) {
                        throw "Server error"
                    } else {
                        throw "Unknown error"
                    }
                } else if (e.request) {
                    throw "Cannot reach server"
                } else {
                    throw "App error"
                }
            }
        } else {
            throw "User not logged in"
        }
    },
    // TODO > this remake for change state with put -TBD

    promoteTask: async (id) => {
        var token = ""
        if (Platform.OS !== 'web') {
            token = await SecureStore.getItemAsync('token');
        } else {
            token = localStorage.getItem('token')
        }
        if (token){ 
            try {
                await axios.put('todo/' + id, {action: "upvote"} ,{headers: {"Authorization": `Bearer ${token}`}})
            } catch (e) {
                if (e.response) {
                    if (e.response.status == 500) {
                        throw "Server error"
                    } else {
                        throw "Unknown error"
                    }
                } else if (e.request) {
                    throw "Cannot reach server"
                } else {
                    throw "App error"
                }
            }
        } else {
            throw "User not logged in"
        }
    }
}