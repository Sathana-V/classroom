import { CURRENT_CLASS } from "./actionTypes"
import { CURRENT_PAGE } from "./actionTypes"

export const setCurrentClass = (value) => {
    return {
        type: CURRENT_CLASS,
        payload: value
    }
}
export const setCurrentPage = (value) => {
    console.log('called setcurrentPage', value);
    return {
        type: CURRENT_PAGE,
        payload: value
    }
}
