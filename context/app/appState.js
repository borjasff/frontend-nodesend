import React, {useReducer} from 'react'
import appContext from './appContext'
import appReducer from './appReducer'
import clientAxios from '../../config/axios'
import { SHOW_ALERT, 
        CLEAR_ALERT, 
        UPLOAD_FIEL_SUCCESS, 
        UPLOAD_FIEL_ERROR, 
        UPLOAD_LINK_SUCCESS, 
        UPLOAD_LINK_ERROR,
        UPLOAD_FIEL,
        CLEAR_STATE,
        ADD_PASSWORD,
        ADD_DOWNLOAD } from '../../types'


const appState = ({children}) => {


    const initialState = {
        message_file: null,
        name: '',
        original_name: '',
        loading: null,
        downloads: 1,
        password: '',
        author: null,
        url: ''
    }
    
    //create dispatch and state
    const [state, dispatch ] = useReducer(appReducer, initialState)

    //show alert
    const showAlert = msg => {
        console.log(msg)
        dispatch({
            type: SHOW_ALERT,
            payload: msg
        })

        setTimeout(() => {
            dispatch({
                type: CLEAR_ALERT
            })
        },4000)
    }

    //upload files to server
    const uploadFiel = async (formData, nameFile) => {

        dispatch({
            type: UPLOAD_FIEL
        })

        try {
            const answer = await clientAxios.post('/api/files', formData )
            console.log(answer.data.doc)
            dispatch({
                type: UPLOAD_FIEL_SUCCESS,
                payload: {
                    name: answer.data.doc,
                    original_name: nameFile
                }
            })
             
        } catch (error) {
            //console.log(error)
            dispatch({
                type: UPLOAD_FIEL_ERROR,
                payload: error.response.data.msg
            })
        }
    }
    //create link when upload is successful
    const createLink = async() => {
        const data = {
            name: state.name,
            original_name: state.original_name,
            downloads: state.downloads,
            password: state.password,
            author: state.author
        }

        try {
            const answer = await clientAxios.post('/api/links', data)
            
            dispatch({
                type: UPLOAD_LINK_SUCCESS,
                payload: answer.data.msg
            })
        } catch (error) {
            console.log(error)
        }
    }
    const clearState = () => {
        dispatch({ type: CLEAR_STATE})
    }

    //add Password
    const addPassword = password => {
        dispatch({
            type: ADD_PASSWORD,
            payload: password
        })
    }

    const addDownload = downloads => {
        dispatch({
            type: ADD_DOWNLOAD,
            payload: downloads
        })
    }


  return (
    <appContext.Provider
        value={{
            message_file: state.message_file,
            showAlert,
            uploadFiel,
            name: state.name,
            original_name: state.original_name,
            loading: state.loading,
            createLink,
            downloads: state.downloads,
            password: state.password,
            author: state.author,
            url: state.url,
            clearState,
            addPassword,
            addDownload
        }}
    >
        {children}
    </appContext.Provider>

  )
}

export default appState