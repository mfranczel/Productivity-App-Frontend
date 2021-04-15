import React, {useEffect, useState} from 'react'
import { TextInput, View, StyleSheet, Text, Button, TouchableOpacity, Image } from "react-native"
import { useSelector, useStore } from 'react-redux'
import constants from '../constants'
import * as SecureStore from 'expo-secure-store';
import DateTimePicker from '@react-native-community/datetimepicker'

const Profile = ({ navigation }) => {

    const user = useSelector((state) => state.user.currentUser)
    const [setToken, token] = useState("")
    const password = useState("")
    const [birthDate, setBirthDate] = useState(new Date(user.birth_date))
    const [show, setShow] = useState(false)

    const onDatePickerChange = (event, selectedDate) => {
        selectedDate = selectedDate || birthDate
        setShow(Platform.OS === 'ios')
        setBirthDate(selectedDate)
    }


    useEffect(() => {
        SecureStore.getItemAsync('token')   
            .then(res => {
                setToken(res)
            })
            .catch(err => {

            })
    }, [])

    return (
        <View style={styles.container}>
            <View style={{backgroundColor: "#FF7575", width: "100%", height: 120}}/>
            <Image style={{height: 50, width: 50}} source={
                    { uri: constants.BASE_URL + '/pic/' + user.photo,
                    headers: {
                                Authorization: `Bearer ${token}`
                            }
                    }}/>
            <TextInput style={styles.input} placeholder="Email" value={ user.email } onChangeText={ text => setEmail(text) } />
            <TextInput secureTextEntry={true} style={styles.input} placeholder="••••••••••••" value={ password } onChangeText={ text => setPassword(text) } />
            <TouchableOpacity  onPress={() => setShow(true)}>
                <TextInput style={styles.input} placeholder="04/20/1969" editable={false} value={birthDate.getDate() + "/" + (birthDate.getMonth()+1) + "/" + birthDate.getFullYear()}/>
            </TouchableOpacity>
            {
              show && <DateTimePicker mode="date" display="spinner" value={birthDate} onChange={onDatePickerChange}/>
            }
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity style={styles.deleteButton} onPress={() => {}}>
                    <Text style={styles.deleteText}>Delete account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={() => {}}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 20,
      height: "100%"
    },
    input: {
        height: 40,
        width: 260,
        margin: 10,
        borderWidth: 1,
        paddingLeft: 12
    },
    saveButton: {
        borderWidth: 1,
        borderColor: "#ff5b5b",
        backgroundColor: "white",
        color: "black",
        width: 120,
        margin: 10,
        height: 40,
        alignItems: "center"
    },
    saveText: {
        marginTop: "auto",
        marginBottom: "auto",
        color: "#ff5b5b",
        margin: 5
    },
    deleteButton: {
        borderWidth: 1,
        backgroundColor: "white",
        color: "black",
        width: 120,
        margin: 10,
        height: 40,
        alignItems: "center"
    },
    deleteText: {
        marginTop: "auto",
        marginBottom: "auto",
        color: "black",
        margin: 5
    }
})

export default Profile