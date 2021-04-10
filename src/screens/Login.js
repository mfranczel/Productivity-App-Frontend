import { TextInput, View, StyleSheet, Text, Button, TouchableOpacity } from "react-native"
import {connect, useDispatch} from 'react-redux'
import React, {useState} from 'react'
import User from "../actions/User"

const Login = ({ navigation, login}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const onLoginButtonClick = () => {
        dispatch(login(email, password))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>To do</Text>
            <TextInput style={styles.input} placeholder="Email" value={ email } onChangeText={ text => setEmail(text) } />
            <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" value={ password } onChangeText={ text => setPassword(text) } />
            <TouchableOpacity style={styles.loginButton} onPress={() => onLoginButtonClick()}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={{width: 30, textAlign: "center"}}>or</Text>
                <View style={styles.dividerLine} />
            </View>
            <View style={{width: 260, flexDirection: "row", justifyContent: "center", marginTop: 10}}>
                <TouchableOpacity onPress={() => {navigation.navigate("Register")}}>
                    <Text style={{color: "#ff5b5b", textDecorationLine: "underline"}}>Register</Text>
                </TouchableOpacity>
                <Text> a new account</Text>
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
    input: {
        height: 40,
        width: 260,
        margin: 10,
        borderWidth: 1,
        paddingLeft: 12
    },
    header: {
        fontSize: 36,
        paddingBottom: 20,
        color: "#ff5b5b"
    },
    loginButton: {
        borderWidth: 1,
        borderColor: "#ff5b5b",
        backgroundColor: "white",
        color: "black",
        width: 260,
        margin: 10,
        height: 40,
        marginBottom: 15,
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
  });

const mapStateToProps = (state) => {
    const {loggedIn} = state.auth
    return {
        loggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {login: User.login}
}
  
const connectedApp = connect(mapStateToProps, mapDispatchToProps)(Login)

export default connectedApp