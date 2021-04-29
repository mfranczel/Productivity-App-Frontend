import React, {useState} from 'react'
import { TextInput, View, StyleSheet, Text, Button, TouchableOpacity } from "react-native"


const Timer = ({ navigation }) => {

    const [rounds, setRounds] = useState(1);
    const onPressRoundsUp = () => setRounds(prevRounds => prevRounds + 1)
    const onPressRoundsDown = () => setRounds(prevRounds => (prevRounds -1 < 1 ? 1 : prevRounds - 1))

    const [breaks, setBreaks] = useState(5);
    const onPressBreaksUp = () => setBreaks(prevBreaks => prevBreaks + 1)
    const onPressBreaksDown = () => setBreaks(prevBreaks => ((prevBreaks - 1 < 1) ? 1:  prevBreaks - 1 ))

    const [timer, setTimerMinutes] = useState(25);
    const onPressTimerUp = () => setTimerMinutes(prevTimer => prevTimer + 1)
    const onPressTimerDown = () => setTimerMinutes(prevTimer => ((prevTimer -1 < 1) ? 1 : prevTimer - 1))
    
    const [timerSeconds, setTimerSeconds] = useState("00");

    function startTimer (duration){

        
    }


    const onPressReset = () => {
        setRounds(1)
        setBreaks(5)
        setTimerMinutes(25)
        setTimerSeconds("00")
    }

    const onPressPause = () => {
        // clearInterval()
    }

    var v = null
    const onPressStart = () => {
        // if (v == null){
        //     v = startTimer(timer * 60)
        // }else {
        //     clearImmediate()
        // }
    }



    return (
        <View style={styles.container}>
            
            <View style={styles.containerTimer}>
                <View style={styles.alignLeft}>
                    <Text style={styles.mainTimer}>{timer}:{timerSeconds}</Text>
                    <View>
                        <TouchableOpacity style={styles.arrowsTimer} onPress={onPressTimerUp}>⮝</TouchableOpacity>
                        <TouchableOpacity style={styles.arrowsTimer} onPress={onPressTimerDown}>⮟</TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.containerBreak}>
                <View style={styles.alignLeft}>
                    <Text style={styles.incrementFields}>Breaks: {breaks} min</Text>
                    <View>
                        <TouchableOpacity style={styles.arrows } onPress={onPressBreaksUp}>⮝</TouchableOpacity>
                        <TouchableOpacity style={styles.arrows } onPress={onPressBreaksDown}>⮟</TouchableOpacity>
                    </View>
                </View>
            </View>
            
            
            <View style={styles.containerRounds}>
                <View style={styles.alignLeft}>
                    <Text style={styles.incrementFields}>Rounds: {rounds}</Text>
                    <View>
                        <TouchableOpacity style={styles.arrows} onPress={onPressRoundsUp}>⮝</TouchableOpacity>
                        <TouchableOpacity style={styles.arrows} onPress={onPressRoundsDown}>⮟</TouchableOpacity>
                    </View>
                </View>
            </View>


            <View>
                <TouchableOpacity style={styles.startButton} onPress={onPressStart}>
                    <Text style={styles.startText}>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.pauseButton} onPress={onPressPause}>
                    <Text style={styles.pauseText}>Pause</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.resetButton} onPress={onPressReset}>
                    <Text style={styles.resetText}>Reset</Text>
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
      paddingTop: 220,
      height: "100%"
    },

    startButton: {
        borderWidth: 1,
        borderColor: "#ff5b5b",
        backgroundColor: "white",
        color: "black",
        width: 260,
        margin: 10,
        height: 40,
        marginBottom: 8,
        alignItems: "center"
    },
    startText: {
        marginTop: "auto",
        marginBottom: "auto",
        color: "#ff5b5b",
        margin: 5
    },
 
    pauseButton: {
        borderWidth: 1,
        backgroundColor: "white",
        color: "black",
        width: 260,
        margin: 10,
        height: 40,
        marginBottom: 8,
        alignItems: "center"
    },
    pauseText: {
        marginTop: "auto",
        marginBottom: "auto",
        margin: 5
    },
     
    resetButton: {
        borderWidth: 1,
        backgroundColor: "white",
        color: "black",
        width: 260,
        margin: 10,
        height: 40,
        marginBottom: 8,
        alignItems: "center"
    },
    resetText: {
        marginTop: "auto",
        marginBottom: "auto",
        margin: 5
    },

    // rounds elements and break
    containerRounds: {
        padding: 16,
    },

    containerBreak: {
        padding: 16,
      },
    
    alignLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    
    incrementFields: {
        fontSize: 32,
        fontWeight: "bold",
        paddingRight: 16,
        color: "#6A6868",
    },
      
    arrows: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#6A6868",
    },

    //timer
    containerTimer: {
        padding: 16,
    },

    
    mainTimer: {
      fontSize: 52,
      fontWeight: "bold",
        paddingRight: 16,
       color: "#ff5b5b",
    },
    
      
    arrowsTimer: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ff5b5b",
    },

})

export default Timer