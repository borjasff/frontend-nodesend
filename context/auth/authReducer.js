import { use } from "react";
import { REGISTER_EXIT,  REGISTER_ERROR, CLEAR_ALERT, LOGIN_ERROR, LOGIN_SUCCESS, USER_AUTHENTICATED, LOGOUT} from "../../types";

export default (state, action) => {
    switch(action.type) {
        case REGISTER_ERROR:
        case REGISTER_EXIT: 
        case LOGIN_ERROR:
            return {
                ...state,
                message: action.payload
            }
        case LOGIN_SUCCESS: 
        localStorage.setItem('token', action.payload)
        return{
            ...state,
            token: action.payload,
            authenticated: true
        }
        case CLEAR_ALERT:
            return{
                ...state,
                message: null
            }
        case USER_AUTHENTICATED:
            return{
                ...state,
                user: action.payload,
                authenticated: true
            }
            case LOGOUT: 
            localStorage.removeItem('token')
            return {
                ...state,
                user: null,
                token: null,
                authenticated: null,
                
            }
        default:
            return state
    }
}