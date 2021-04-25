import React, {useEffect, useState} from 'react'
import { TextInput, View, StyleSheet, Text, Button, TouchableOpacity, Image, ActionSheetIOS } from "react-native"
import { useSelector, useStore } from 'react-redux'
import constants from '../constants'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Avatar, Accessory} from 'react-native-elements';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLongArrowAltUp, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import * as SecureStore from 'expo-secure-store';

const Profile = ({ navigation }) => {

    const user = useSelector((state) => state.user.currentUser)
    const [token, setToken] = useState("")
    const password = useState("")
    const [birthDate, setBirthDate] = useState(new Date(user.birth_date))
    const [email, setEmail] = useState(user.email)
    const [show, setShow] = useState(false)
    const tok = useSelector(state => state.user.currentUser.token)
    const [image, setImage] = useState("")



    useEffect(() => {
        loadImage()
    }, [])

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

    const logout = async () => {
        if (Platform.OS === "web") {
            localStorage.setItem("token", '')
        } else {
            await SecureStore.setItemAsync("token", '')
        }
        navigation.dangerouslyGetParent().reset()
    }



    return (
        <View style={styles.container}>
            <View style={{backgroundColor: "#FF7575", width: "100%", height: 120, justifyContent: "center", alignItems: "center", paddingTop: 100, marginBottom: 75}}>
                <TouchableOpacity onPress={() => logout()}>
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
            <Text style={{width: 260}}>Email:</Text>
            <TextInput style={styles.input} placeholder="jozko.mrkvicka@jozko.com" value={ email } onChangeText={ text => setEmail(text) } />
            <Text style={{width: 260}}>Password:</Text>
            <TextInput secureTextEntry={true} style={styles.input} placeholder="••••••••••••" value={ password } onChangeText={ text => setPassword(text) } />
            <Text style={{width: 260}}>Birthdate:</Text>
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