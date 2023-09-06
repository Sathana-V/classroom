import { CURRENT_CLASS } from "./actionTypes"
export const setCurrentClass = (value) => {
    return {
        type: CURRENT_CLASS,
        payload: value
    }
}
