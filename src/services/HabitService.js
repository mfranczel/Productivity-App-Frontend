import axios from './helper'
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export default {
    getHabits: async () => {
        var token = ""
        if (Platform.OS !== 'web') {
            token = await SecureStore.getItemAsync('token');
        } else {
            token = localStorage.getItem('token')
        }
        if (token){
            try {
                var res = await axios.get('/habit', {headers: {"Authorization": `Bearer ${token}`}})
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
    addHabit: async (habit) => {
        var token = ""
        if (Platform.OS !== 'web') {
            token = await SecureStore.getItemAsync('token');
        } else {
            token = localStorage.getItem('token')
        }
        if (token){ 
            try {
                await axios.post('habit', habit, {headers: {"Authorization": `Bearer ${token}`}})
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
    removeHabit: async (id) => {
        var token = ""
        if (Platform.OS !== 'web') {
            token = await SecureStore.getItemAsync('token');
        } else {
            token = localStorage.getItem('token')
        }
        if (token){ 
            try {
                await axios.delete('habit/' + id, {headers: {"Authorization": `Bearer ${token}`}})
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
    completeHabit: async (id) => {
        var token = ""
        if (Platform.OS !== 'web') {
            token = await SecureStore.getItemAsync('token');
        } else {
            token = localStorage.getItem('token')
        }
        if (token){ 
            try {
                await axios.post('habit/' + id, {action: "complete"} ,{headers: {"Authorization": `Bearer ${token}`}})
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
    }
}