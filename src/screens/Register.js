import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from "react-native"
import React, {useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import UserService from "../services/UserService"

const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Register = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [birthDate, setBirthDate] = useState(new Date('1969-04-20'))
    const [show, setShow] = useState(false)
    const [error, setError] = useState("")

    const checkEmail = () => {
        var tEmail = email.toLowerCase().trim()
        if (!emailRe.test(tEmail)) {
            setEmailError("Email is invalid")
        } else {
            setEmailError("")
        }
    }

    const checkPassword = () => {
        if (password.length < 8) {
            setPasswordError("Your password has to be at least 8 characters long")
        } else {
            setEmailError("")
        }
    }

    const onDatePickerChange = (event, selectedDate) => {
        selectedDate = selectedDate || birthDate
        setShow(Platform.OS === 'ios')
        setBirthDate(selectedDate)
    }

    const handleRegister = () => {
        checkEmail()
        checkPassword()

        if (emailError === "" && passwordError === "") {
            var tEmail = email.toLowerCase().trim()

            UserService.register(tEmail, password, birthDate.toISOString().split('T')[0])
                .then((res) => {
                    navigation.goBack()
                })
                .catch((err) => {
                    setError(err)
                })
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.header}>To do</Text>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={ text => setEmail(text)} onEndEditing={() => checkEmail()}/>
            <Text style={{width: 260, color: "red" }}>{emailError}</Text>
            <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" value={password} onChangeText={ text => setPassword(text)}  onEndEditing={() => checkPassword()}/>
            <Text style={{width: 260, color: "red" }}>{passwordError}</Text>
            <TouchableOpacity  onPress={() => setShow(true)}>
                <TextInput style={styles.input} placeholder="Birthdate" editable={false} value={birthDate.getDate() + "/" + (birthDate.getMonth()+1) + "/" + birthDate.getFullYear()}/>
            </TouchableOpacity>
            {
              show && <DateTimePicker maximumDate={new Date().setFullYear(new Date().getFullYear() - 10)} minimumDate={new Date().setFullYear(new Date().getFullYear() - 130)} mode="date" display="spinner" value={birthDate} onChange={onDatePickerChange}/>
            }
            <Text style={{width: 260, textAlign: "center"}}>{error}</Text>
            <TouchableOpacity style={styles.loginButton} onPress={() => handleRegister()}>
                <Text style={styles.loginText}>Register</Text>
            </TouchableOpacity>
            <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={{width: 30, textAlign: "center"}}>or</Text>
                <View style={styles.dividerLine} />
            </View>
            <View style={{width: 260, flexDirection: "row", justifyContent: "center"}}>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <Text style={{color: "#ff5b5b", textDecorationLine: "underline"}}>Login</Text>
                </TouchableOpacity>
                <Text> to your account</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 220,
      height: "100%"
    },
    header: {
        fontSize: 36,
        paddingBottom: 20,
        color: "#ff5b5b"
    },
    input: {
        height: 40,
        width: 260,
        margin: 10,
        marginTop: 0,
        marginBottom: 0,
        borderWidth: 1,
        paddingLeft: 12
    },
    loginButton: {
        borderWidth: 1,
        borderColor: "#ff5b5b",
        backgroundColor: "white",
        color: "black",
        width: 260,
        margin: 10,
        height: 40,
        alignItems: "center"
    },
    loginText: {
        marginTop: "auto",
        marginBottom: "auto",
        color: "#ff5b5b",
        margin: 5
    },
    divider: {
        flexDirection: "row",
        alignItems: "center"
    },
    dividerLine: {
        borderBottomWidth: 1,
        borderBottomColor: "black",
        height: 0,
        width: 115,
    }
})

export default Register