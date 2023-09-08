import { CURRENT_CLASS } from "../actions/actionTypes"
import { CURRENT_PAGE } from "../actions/actionTypes"
const initial_state = {
    currentClass: {},
    currentPage: ''
}

export const classDetails = (state = initial_state, action) => {
    switch (action.type ) {
        case CURRENT_CLASS:
        return {
            ...state,
            currentClass: action.payload
        }
        case CURRENT_PAGE:
        return {
            ...state,
            currentPage: action.payload
        }
        default:
            return state
    }
}