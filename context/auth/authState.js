import authContext from "./authContext";
import React, { useReducer } from "react";
import authReducer from "./authReducer";
import { REGISTER_EXIT, REGISTER_ERROR, CLEAR_ALERT, LOGIN_ERROR, LOGIN_SUCCESS, USER_AUTHENTICATED, LOGOUT } from "../../types";
import tokenAuth from "../../config/tokenAuth";

import clientAxios from "../../config/axios";

const AuthState = ({children}) => {
    
    //define initial state
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem("token") : '',
        authenticated: null,
        user: null,
        message: null
    }

    //define reducer
    const [ state, dispatch] = useReducer(authReducer, initialState)

    //register new user
    const registerUser = async datas => { 
        try {
            const answer = await clientAxios.post('/api/users', datas)

            dispatch({
                type: REGISTER_EXIT,
                payload: answer.data.msg
            })
            
        } catch (error) {
            console.log(error.response.data.msg)
            
            dispatch({
                type: REGISTER_ERROR,
                payload: error.response.data.msg
            })
            
        }
        //Clear alert message after 4 seconds
            setTimeout(() =>{
                dispatch({
                    type: CLEAR_ALERT
                })  
            },4000)
    }

    //authenticate user
    const login = async datas => {
        try {
            const answer = await clientAxios.post('/api/auth', datas)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: answer.data.token
            })
        } catch (error) {

            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
          //Clear alert message after 4 seconds
          setTimeout(() =>{
            dispatch({
                type: CLEAR_ALERT
            })  
        },4000)
    }
    //logout 
    const logout =  () => {
        dispatch({
            type: LOGOUT
        })
    }


    //return user auth by jwt
    const userAuthenticatedHome = async () => {
        const token = localStorage.getItem('token')
        if(token) {
            tokenAuth(token)
        }
        try {
            const answer = await clientAxios.get('/api/auth')
            //if exist user, dispatch user authenticated
            if(answer.data.user) {
                dispatch({
                type: USER_AUTHENTICATED,
                payload: answer.data.user
                })
            }
            
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
    }
    //user authenticated
    const userAuth = name => {
        dispatch({
            type:  USER_AUTHENTICATED,
            payload: name
        })
    }

    return (
        <authContext.Provider
        value={{
            token: state.token,
            authenticated: state.authenticated,
            user: state.user,
            message: state.message,
            userAuth,
            registerUser,
            login,
            userAuthenticatedHome,
            logout
        }}>
            {children}
        </authContext.Provider>
    )
}
export default AuthState