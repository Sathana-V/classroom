import { combineReducers } from "redux";
import { userAuth } from './userAuth'
import { classDetails } from "./classDetails";
const reducer = combineReducers({
    user: userAuth,
    class: classDetails
})

export default reducer
