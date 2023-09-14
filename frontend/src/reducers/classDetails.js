import { CURRENT_CLASS } from "../actions/actionTypes"
import { CURRENT_PAGE } from "../actions/actionTypes"
const initial_state = {
    currentClass: {},
    currentPage: 'classRoom'
}

export const classDetails = (state = initial_state, action) => {
    console.log('calss deatilas reducers');
    switch (action.type ) {
        case CURRENT_CLASS:
            console.log('haii 1');
        return {
            ...state,
            currentClass: action.payload
        }
        case CURRENT_PAGE:
            console.log('haii 2');
        return {
            ...state,
            currentPage: action.payload
        }
        default:
            console.log('haii 3', state);
            return state
    }
}