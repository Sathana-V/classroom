import { CURRENT_CLASS } from "../actions/actionTypes"

const initial_state = {
    currentClass: {

    }
}

export const classDetails = (state = initial_state, action) => {
    switch (action.type ) {
        case CURRENT_CLASS:
        return {
            ...state,
            currentClass: action.payload
        }
        default:
            return state
    }
}