
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState, useRef} from 'react'
import { Animated, Text, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'


import { useDispatch, useSelector } from 'react-redux'
import { removeTask, completeTask } from '../slices/taskSlice'

const TaskItem = (task) => {

  // const data = useState(["do", "did,", "to be done"])

  const dispatch = useDispatch()
  const swipeableRef = useRef(null);

  return (
     <View style={styles.container}>
       <View style={styles.alignLeft}>
         <TouchableOpacity style={styles.cross} onPress={() => {dispatch(completeTask(task.text.id, task.text.type))}}>
            <View style={styles.tapElement}>
              {
                task.task.task_state.state == 2 && <FontAwesomeIcon icon={faTimes} size={24}/>
              }
            </View>
         </TouchableOpacity>
         <Text style={styles.itemText}>{task.text.text}</Text>
       </View>
       <TouchableOpacity style={styles.cross} onPress={() => {dispatch(removeTask(task.text.id, task.text.type))}}>
         <View style={styles.cross}><Text><FontAwesomeIcon icon={faTimes} /></Text></View>
       </TouchableOpacity>
     </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingBottom: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderRadius: 3,
    shadowColor: "#0000ff",
    minWidth: '90%',
    shadowOffset: {
        width: 2,
        height: -20,
    },
    shadowOpacity: 0.01,
    shadowRadius: 5.46,
  },

  alignLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },

  tapElement: {
    width: 28,
    height: 28, 
    borderWidth:  2,
    borderRadius: 5,
    marginRight: 15,
  },

  itemText: {
    maxWidth: '90%',
  },

  cross: {
      paddingLeft: 16,
      fontWeight: 'bold'
  },
});

export default TaskItem;