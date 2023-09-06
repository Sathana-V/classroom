
import { USER_LOGIN, USER_LOGOUT  } from "../actions/actionTypes";
const initial_state = {
    userStatus: '',
}
export const userAuth = (state = initial_state, action) => {
    switch (action.type) {
        case USER_LOGIN: 
            return {
               ...state,
               userStatus: action.payload
            }
        case USER_LOGOUT: 
            return {
                ...state,
                userStatus: ''
            }
        default:
            return state
    }
    
}
