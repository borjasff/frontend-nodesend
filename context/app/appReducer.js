
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
export default (state, action) => {
    switch(action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                message_file: action.payload
            }
        case CLEAR_ALERT:
            return {
                ...state,
                message_file: null
            }
        case UPLOAD_FIEL_SUCCESS:
            return{
                ...state,
                name: action.payload.name,
                original_name: action.payload.original_name,
                loading: null
                
            }
        case UPLOAD_FIEL_ERROR:
            return{
                ...state,
                message_file: action.payload,
                loading: null
            }
            case UPLOAD_FIEL:
                return{
                    ...state,
                    loading: true
                }
        case UPLOAD_LINK_SUCCESS:
            return{
                ...state,
                url: action.payload
            }
        case CLEAR_STATE:
            return {
                ...state,
                message_file: null,
                name: '',
                original_name: '',
                loading: null,
                downloads: 1,
                password: '',
                author: null,
                url: ''
            }
        case ADD_PASSWORD:
            return{
                ...state,
                password: action.payload
            }
        case ADD_DOWNLOAD:
            return{
                ...state,
                downloads: action.payload
            }
        default:
        return state
    }
}