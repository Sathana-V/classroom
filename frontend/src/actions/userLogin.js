import { USER_LOGIN, USER_LOGOUT, USER_DETAILS} from "./actionTypes";

export const userLogin = (payload) => {
    return {
        type: USER_LOGIN,
        payload: payload
    }
}
export const userLogout = (payload) => {
    return {
        type: USER_LOGOUT,
        payload: payload
    }
}
export const userDetails = (payload) => {
    return {
        type: USER_DETAILS,
        payload: payload
    }
}

