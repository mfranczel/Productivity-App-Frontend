import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react'
import { useEffect } from 'react';
import { TextInput, View, StyleSheet, Text, Button, TouchableOpacity, Animated } from "react-native"
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

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

    const [timerSeconds, setTimerSeconds] = useState(0);
    const [isTimerPlaying, setTimerPlaying] = useState(false)
    const [isTimerRunning, setTimerRunning] = useState(false)
    const [showBreak, setShowBreak] = useState(false)

    function startTimer (duration){

        
    }


    const onPressReset = () => {
        setRounds(1)
        setBreaks(5)
        setTimerMinutes(25)
        setTimerSeconds(0)
        setTimerRunning(false)
        setShowBreak(false)
    }

    const onPressPause = () => {
        setTimerPlaying(false)
    }

    const onPressStart = () => {
        setRounds(rounds - 1)
        setTimerRunning(true)
        setTimerPlaying(true)
    }

    const onPressContinue = () => {
        setTimerPlaying(true)
    }




    return (
        <View style={styles.container}>
            {!isTimerRunning ? (<>
            <View style={styles.containerTimer}>
                <View style={styles.alignLeft}>
                    <Text style={styles.mainTimer}>{timer}:{timerSeconds < 10 ? "0" + timerSeconds : timerSeconds}</Text>
                    <View>
                        <TouchableOpacity style={styles.arrowsTimer} onPress={onPressTimerUp}><FontAwesomeIcon size={32} icon={faAngleUp}/></TouchableOpacity>
                        <TouchableOpacity style={styles.arrowsTimer} onPress={onPressTimerDown}><FontAwesomeIcon size={32} icon={faAngleDown}/></TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.containerBreak}>
                <View style={styles.alignLeft}>
                    <Text style={styles.incrementFields}>Breaks: {breaks} min</Text>
                    <View>
                        <TouchableOpacity style={styles.arrows } onPress={onPressBreaksUp}><FontAwesomeIcon size={22} icon={faAngleUp}/></TouchableOpacity>
                        <TouchableOpacity style={styles.arrows } onPress={onPressBreaksDown}><FontAwesomeIcon size={22} icon={faAngleDown}/></TouchableOpacity>
                    </View>
                </View>
            </View>
            
            
            <View style={styles.containerRounds}>
                <View style={styles.alignLeft}>
                    <Text style={styles.incrementFields}>Rounds: {rounds}</Text>
                    <View>
                        <TouchableOpacity style={styles.arrows} onPress={onPressRoundsUp}><FontAwesomeIcon size={22} icon={faAngleUp}/></TouchableOpacity>
                        <TouchableOpacity style={styles.arrows} onPress={onPressRoundsDown}><FontAwesomeIcon size={22} icon={faAngleDown}/></TouchableOpacity>
                    </View>
                </View>
            </View>
            </>): !showBreak ? (
                <CountdownCircleTimer
                key={1}
                isPlaying={isTimerPlaying}
                duration={timer*60}
                onComplete={
                    () => {
                        setShowBreak(true)
                        if (rounds === 0) {
                            onPressReset()
                            setTimerRunning(false)
                            setTimerPlaying(false)
                        }
                    }
                }
                colors={[
                  ['#004777', 0.4],
                  ['#F7B801', 0.4],
                  ['#A30000', 0.2],
                ]}
              >
            {({ remainingTime, animatedColor }) => (
                <View>
                    <Text style={{textAlign:"center", color: "#ff5b5b", fontSize: 25}}> Work! </Text>
                    <Animated.Text style={{ color: animatedColor, fontSize: 30, textAlign: "center" }}>
                        {Math.floor(remainingTime / 60) + ":" + (remainingTime%60 < 10 ? "0" + remainingTime%60 : remainingTime%60)}
                    </Animated.Text>
                </View>
            )}
            </CountdownCircleTimer>
            ): (
                <CountdownCircleTimer
                key={2}
                isPlaying={isTimerPlaying}
                duration={breaks*60}
                onComplete={
                    () => {
                        setShowBreak(false)
                        setRounds(rounds - 1)
                        
                    }
                }
                colors={[
                  ['#004777', 0.4],
                  ['#F7B801', 0.4],
                  ['#A30000', 0.2],
                ]}
              >
            {({ remainingTime, animatedColor }) => (
                <View>
                    <Text style={{textAlign:"center", color: "#B7DDA9", fontSize: 25}}> Free time! </Text>
                    <Animated.Text style={{ color: animatedColor, fontSize: 30, textAlign: "center" }}>
                        {Math.floor(remainingTime / 60) + ":" + (remainingTime%60 < 10 ? "0" + remainingTime%60 : remainingTime%60)}
                    </Animated.Text>
                </View>
            )}
            </CountdownCircleTimer>
            )}


            <View style={{width: 260}}>
                {isTimerRunning && <Text style={{textAlign: "center", width: 260, marginTop: 20, marginBottom: 20}}>Remaining rounds: {rounds}</Text>}
                {isTimerRunning && !isTimerPlaying ?
                <TouchableOpacity style={styles.startButton} onPress={onPressContinue}>
                    <Text style={styles.startText}>Continue</Text>
                </TouchableOpacity> : isTimerRunning && isTimerPlaying ?
                <TouchableOpacity style={styles.pauseButton} onPress={onPressPause}>
                    <Text style={styles.pauseText}>Pause</Text>
                </TouchableOpacity> : <></>
                }
                {!isTimerRunning &&
                <TouchableOpacity style={styles.startButton} onPress={onPressStart}>
                    <Text style={styles.startText}>Start</Text>
                </TouchableOpacity>
                }
                {isTimerRunning &&
                <TouchableOpacity style={styles.resetButton} onPress={onPressReset}>
                    <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 150,
      height: "100%"
    },

    startButton: {
        borderWidth: 1,
        borderColor: "#ff5b5b",
        backgroundColor: "white",
        color: "black",
        width: 260,
        marginTop: 20,
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
        color: "#000000",
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