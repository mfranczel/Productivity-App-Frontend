import axios from './helper'
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export default {
    getStatsDaily: async (path) => { 
        var token = ""
        if (Platform.OS !== 'web') {
            token = await SecureStore.getItemAsync('token');
        } else {
            token = localStorage.getItem('token')
        }
        if (token){
            try {
                // for now it is fixed -- daily
                var res = await axios.get('/stats/daily', {headers: {"Authorization": `Bearer ${token}`}})
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
    getStatsWeekly: async (path) => { 
        var token = ""
        if (Platform.OS !== 'web') {
            token = await SecureStore.getItemAsync('token');
        } else {
            token = localStorage.getItem('token')
        }
        if (token){
            try {
                // for now it is fixed -- daily
                var res = await axios.get('/stats/weekly', {headers: {"Authorization": `Bearer ${token}`}})
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
    getStatsMonthly: async (path) => { 
        var token = ""
        if (Platform.OS !== 'web') {
            token = await SecureStore.getItemAsync('token');
        } else {
            token = localStorage.getItem('token')
        }
        if (token){
            try {
                // for now it is fixed -- daily
                var res = await axios.get('/stats/monthly', {headers: {"Authorization": `Bearer ${token}`}})
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
    }
}