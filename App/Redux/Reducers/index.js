import {combineReducers} from "redux"
import { ContactReducer } from "./Contact"

const rootReducer = combineReducers({
    contact: ContactReducer
});


export default rootReducer;