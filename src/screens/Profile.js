import React, {useEffect, useState} from 'react'
import { TextInput, View, StyleSheet, Text, Button, TouchableOpacity, Image, ActionSheetIOS } from "react-native"
import { useDispatch, useSelector, useStore } from 'react-redux'
import constants from '../constants'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Avatar, Accessory} from 'react-native-elements';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLongArrowAltUp, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import * as SecureStore from 'expo-secure-store';
import { changeProfile, deleteProfile, logout } from '../slices/userSlice'

const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const Profile = ({ navigation }) => {

    const user = useSelector((state) => state.user.currentUser)
    const [token, setToken] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [birthDate, setBirthDate] = useState(new Date(user.birth_date))
    const [email, setEmail] = useState(user.email)
    const [emailError, setEmailError] = useState("")
    const [show, setShow] = useState(false)
    const tok = useSelector(state => state.user.currentUser.token)
    const [image, setImage] = useState("")
    const dispatch = useDispatch()


    useEffect(() => {
        loadImage()
    }, [])

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
            setPasswordError("")
        }
    }

    const loadImage = () => {
        fetch(constants.BASE_URL + '/pic', {headers: {Authorization: `Bearer ${tok}`}})
            .then(res => res.blob())
            .then(res => {
                var reader = new FileReader()
                reader.onload = () => {
                    setImage(reader.result)
                }
                reader.readAsDataURL(res)
            })
    }

    const onDatePickerChange = (event, selectedDate) => {
        selectedDate = selectedDate || birthDate
        setShow(Platform.OS === 'ios')
        setBirthDate(selectedDate)
    }


    const pickImage = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return
            }
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            //base64: true
        });
      
      
        if (!result.cancelled) {
            console.log(result)
            const formData = new FormData();

            formData.append('img', {
                name: 'photo.png',
                mimetype: result.type,
                type: "image/"+result.uri.split('.').reverse()[0],
                uri: Platform.OS === "android" ? result.uri : result.uri.replace("file://", "")
            });

            const options = {
                method: 'POST',
                body: formData,
                headers: {Authorization: `Bearer ${tok}`}
            };

            await fetch(constants.BASE_URL + '/pic', options)
            loadImage()
        }
    }

    const signout = () => {
        if (Platform.OS === "web") {
            localStorage.setItem("token", '')
            dispatch(logout())
        } else {
            SecureStore.setItemAsync("token", '')
                .then(res => {
                    dispatch(logout())
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const removeAccount = () => {
        dispatch(deleteProfile())
        if (user == null) {
            if (Platform.OS === "web") {
                localStorage.setItem("token", '')
                dispatch(logout())
            } else {
                SecureStore.setItemAsync("token", '')
                    .then(res => {
                        dispatch(logout())
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
        
    }

    const editProfile = () => {
        checkEmail()
        checkPassword()

        if(emailError === "" && passwordError === "") {
            dispatch(changeProfile(email, password, birthDate.toISOString().split('T')[0]))
        }
    }



    return (
        <View style={styles.container}>
            <View style={{backgroundColor: "#FF7575", width: "100%", height: 120, justifyContent: "center", alignItems: "center", paddingTop: 100, marginBottom: 75}}>
                <TouchableOpacity onPress={() => signout()}>
                    <FontAwesomeIcon size={ 32 } style={{color: "white", alignSelf: "flex-start", marginLeft:"85%", width: 50}} icon={faSignOutAlt} />
                </TouchableOpacity>
                {image !== "" && <Avatar
                    onPress={() => pickImage()}
                    size="xlarge"
                    source={{
                        uri: image
                    }}
                    rounded 
                    >
                {/*<Accessory size={30} onPress={() => sendImage()}/>*/}
                </Avatar>
                }
            </View>
            <View style={{width: 260}}>
                <Text>Email:</Text>
                <TextInput style={styles.input} placeholder="jozko.mrkvicka@jozko.com" value={ email } onEndEditing={() => checkEmail()} onChangeText={ text => setEmail(text) } />
                <Text style={{color: "red" }}>{emailError}</Text>
                <Text >Password:</Text>
                <TextInput secureTextEntry={true} style={styles.input} placeholder="••••••••••••" value={ password } onEndEditing={() => checkPassword()} onChangeText={ text => setPassword(text) } />
                <Text style={{color: "red" }}>{passwordError}</Text>
                <Text >Birthdate:</Text>
                <TouchableOpacity  onPress={() => setShow(true)}>
                    <TextInput style={styles.input} placeholder="04/20/1969" editable={false} value={birthDate.getDate() + "/" + (birthDate.getMonth()+1) + "/" + birthDate.getFullYear()}/>
                </TouchableOpacity>
                {
                show && <DateTimePicker mode="date" display="spinner" value={birthDate} onChange={onDatePickerChange}/>
                }
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => removeAccount()}>
                        <Text style={styles.deleteText}>Delete account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton} onPress={() => editProfile()}>
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                </View>
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
        marginTop: 2,
        borderWidth: 1,
        paddingLeft: 12
    },
    saveButton: {
        borderWidth: 1,
        borderColor: "#ff5b5b",
        backgroundColor: "white",
        color: "black",
        width: 120,
        marginLeft: 10,
        marginTop: 20,
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
        marginTop: 20,
        marginRight: 10,
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