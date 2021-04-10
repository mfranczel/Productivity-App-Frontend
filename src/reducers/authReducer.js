
const INITIAL_STATE = {
    auth: false,
    token: null
}

const authReducer = (state = INITIAL_STATE, action) => {
    if (action.type === "LOGIN_SUCCESS") {
        var newState = {...state}
        newState.auth = action.payload.auth
        newState.user = action.payload.user
        return newState
    } else if (action.type === "LOGIN_ERROR"){
        return state
    } else if (action.type === "SERVER_ERROR"){
        return state
    } else if (action.type === "CONNECTION_ERROR"){
        return state
    } else {
        return state
    }
}


export default authReducer