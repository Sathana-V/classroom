import { USER_LOGIN, USER_LOGOUT } from "./actionTypes";

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


