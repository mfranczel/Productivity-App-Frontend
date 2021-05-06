import { createSlice } from '@reduxjs/toolkit'
import TaskService from '../services/TaskService'
import {store} from '../App'


const initialState = {
    error: {message: ""},
    loading: false,
    tasksDaily: [],
    tasksWeekly: [],
    tasksMonthly: []
}
 
const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasksDaily: {
            reducer: (state, action) => {
                return state
            },
            prepare: () => {
                var token = store.getState().user.token
                var meta = {
                    offline: {
                        effect: { url: `/todo/daily`, method: "GET", headers: {"Authorization": `Bearer ${token}`}},
                        commit: { type: 'tasks/commitDailyTasks'}
                    }
                }
                return { meta }
            }
        },
        setTasksWeekly: {
            reducer: (state, action) => {
                return state
            },
            prepare: () => {
                var token = store.getState().user.token
                var meta = {
                    offline: {
                        effect: { url: `/todo/weekly`, method: "GET", headers: {"Authorization": `Bearer ${token}`}},
                        commit: { type: 'tasks/commitWeeklyTasks'}
                    }
                }
                return { meta }
            }
        },
        setTasksMonthly: {
            reducer: (state, action) => {
                return state
            },
            prepare: () => {
                var token = store.getState().user.token
                var meta = {
                    offline: {
                        effect: { url: `/todo/monthly`, method: "GET", headers: {"Authorization": `Bearer ${token}`}},
                        commit: { type: 'tasks/commitMonthlyTasks'}
                    }
                }
                return { meta }
            }
        },
        addTask: {
            reducer: (state, action) => {
                action.payload.task_state = {state: 0}
                action.payload.synced = false
                var newState


                if (action.payload.type === 0) {
                    action.payload.id = state.tasksDaily.length > 0 ? state.tasksDaily[state.tasksDaily.length-1].id + 1 : 1
                    newState = {...state, tasksDaily: [...state.tasksDaily, action.payload]}
                } else if (action.payload.type === 1) {
                    action.payload.id = state.tasksWeekly.length > 0 ? state.tasksWeekly[state.tasksWeekly.length-1].id + 1 : 1
                    newState = {...state, tasksWeekly: [...state.tasksWeekly, action.payload]}
                } else {
                    action.payload.id = state.tasksMonthly.length > 0 ? state.tasksMonthly[state.tasksMonthly.length-1].id + 1 : 1
                    newState = {...state, tasksMonthly: [...state.tasksMonthly, action.payload]}
                }
                
                return newState
            },
            prepare: (task) => {
                var token = store.getState().user.token

                var meta = {
                    offline: {
                        effect: { url: '/todo', method: "POST", body: task, headers: {"Authorization": `Bearer ${token}`, 'Content-Type': 'application/json'} },
                        commit: { type: 'tasks/commitTaskAddition' },
                    }
                }
                var nt = {...task}
                nt.type = nt.type === "daily" ? 0 : nt.type === "weekly" ? 1 : 2

                return { meta, payload: nt }
            }
        },
        removeTask: {
            reducer: (state, action) => {
                var id = action.payload.id
                var si = action.payload.selectedIndex

                var newState = {...state}
                var tasks

                if (si === 'daily') {
                    tasks = [...newState.tasksDaily]
                } else if (si === 'weekly') {
                    tasks = [...newState.tasksWeekly]
                } else {
                    tasks = [...newState.tasksMonthly]
                }
                tasks = tasks.filter(h => h.id !== id)

                if (si === 'daily') {
                    newState.tasksDaily = tasks
                } else if (si === 'weekly') {
                    newState.tasksWeekly = tasks
                } else {
                    newState.tasksMonthly = tasks
                }

                return newState
            },
            prepare: (id, selectedIndex) => {
                var token = store.getState().user.token
                var meta = {
                    offline: {
                        effect: { url: `/todo/${id}`, method: "DELETE", headers: {"Authorization": `Bearer ${token}`}},
                        commit: { type: 'habits/commitTaskRemoval'},
                    }
                }
                return { meta, payload: {id, selectedIndex} }
            }
        },
        promoteTask: {
            reducer: (state, action) => {
                var id = action.payload.id
                var selectedIndex = action.payload.selectedIndex

                var newState = {...state}
                var tasks

                if (selectedIndex === 'daily' || selectedIndex === 0 ) {
                   tasks = [...newState.tasksDaily]
                   var task = {...tasks.find(t => t.id === id)}
                   tasks = tasks.filter(t => t.id !== id)
                   task.task_state = {...task.task_state, state: task.task_state.state === 2 ? 2 : task.task_state.state + 1}
                   tasks = [...tasks, task]
                   newState.tasksDaily = tasks
                } else if (selectedIndex === 'monthly' || selectedIndex === 1) {
                   tasks = [...newState.tasksWeekly]
                   var task = {...tasks.find(t => t.id === id)}
                   tasks = tasks.filter(t => t.id !== id)
                   task.task_state = {...task.task_state, state: task.task_state.state === 2 ? 2 : task.task_state.state + 1}
                   tasks = [...tasks, task]
                   newState.tasksWeekly = tasks
                } else {
                   tasks = [...newState.tasksMonthly]
                   var task = {...tasks.find(t => t.id === id)}
                   tasks = tasks.filter(t => t.id !== id)
                   task.task_state = {...task.task_state, state: task.task_state.state === 2 ? 2 : task.task_state.state + 1}
                   tasks = [...tasks, task]
                   newState.tasksMonthly = tasks
                }


                console.log(newState)
                return newState
            },
            prepare: (taskId, selectedIndex) => {
                var token = store.getState().user.token
                console.log(taskId)

                var meta = {
                    offline: {
                        effect: { url: `/todo/${taskId}`, method: "PUT", body: {action: "upvote"}, headers: {"Authorization": `Bearer ${token}`, 'Content-Type': 'application/json'} },
                        commit: { type: 'tasks/commitTaskPromotion' },
                    }
                }

                return { meta, payload: {id: taskId, selectedIndex} }
            }
        },
        commitTaskPromotion(state, action) {
            return state
        },
        commitDailyTasks(state, action) {
            var newState = Object.assign({}, state, {tasksDaily: action.payload.data})
            return newState
        },
        commitWeeklyTasks(state, action) {
            var newState = Object.assign({}, state, {tasksWeekly: action.payload.data})
            return newState
        },
        commitMonthlyTasks(state, action) {
            var newState = Object.assign({}, state, {tasksMonthly: action.payload.data})
            return newState
        },
        commitTaskAddition(state, action) {
            return state
        },
        commitTaskRemoval(state, action) {
            return state
        },
        setLoading(state, action) {
            var newState = {...state, loading: action.payload}
            return newState
        },
        setError(state, action) {
            var newState = {...state, error: {message: action.payload}}
            return newState
        }
    }
})

export const getTasksDaily = () => async (dispatch) => {
    dispatch(taskSlice.actions.setLoading(true))
    try {
        dispatch(taskSlice.actions.setTasksDaily())
    } catch (err) {
        dispatch(taskSlice.actions.setError(err.message))
    } finally {
        dispatch(taskSlice.actions.setLoading(false))
    }
}


export const getTasksWeekly = () => async (dispatch) => {
    dispatch(taskSlice.actions.setLoading(true))
    try {
        dispatch(taskSlice.actions.setTasksWeekly())
    } catch (err) {
        dispatch(taskSlice.actions.setError(err.message))
    } finally {
        dispatch(taskSlice.actions.setLoading(false))
    }
}

export const getTasksMonthly = () => async (dispatch) => {
    dispatch(taskSlice.actions.setLoading(true))
    try {
        dispatch(taskSlice.actions.setTasksMonthly())
    } catch (err) {
        dispatch(taskSlice.actions.setError(err.message))
    } finally {
        dispatch(taskSlice.actions.setLoading(false))
    }
}

export const addTask = (task) => async (dispatch) => {
    dispatch(taskSlice.actions.setLoading(true))
    try {
        dispatch(taskSlice.actions.addTask(task))
    } catch (err) {
        dispatch(taskSlice.actions.setError(err.message))
    } finally {
        dispatch(taskSlice.actions.setLoading(false))
    }
}
 
export const removeTask = (id, seletcIndex) => async (dispatch) => {
    dispatch(taskSlice.actions.setLoading(true))
    try {
        dispatch(taskSlice.actions.removeTask(id, seletcIndex))
    } catch (err) {
        dispatch(taskSlice.actions.setError(err.message))
    } finally {
        dispatch(taskSlice.actions.setLoading(false))
    }
}

export const completeTask = (id, seletcIndex) => async (dispatch) => {
    dispatch(taskSlice.actions.setLoading(true))
    try {
        dispatch(taskSlice.actions.promoteTask(id, seletcIndex))
    } catch (err) {
        dispatch(taskSlice.actions.setError(err.message))
    } finally {
        dispatch(taskSlice.actions.setLoading(false))
    }
}

export default taskSlice.reducer