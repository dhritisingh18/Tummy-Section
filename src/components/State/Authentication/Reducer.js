import { act } from "react"
import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import { isPresentInFavorites } from "../../config/logic"

const initialState = {
    user: null,
    isLoading: false,
    jwt: null,
    success: null,
    error: null,
    favorites: []
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case ADD_TO_FAVORITE_REQUEST:
        case GET_USER_REQUEST:
            return { ...state, isLoading: true, error: null, success: null }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, jwt: action.payload, success: "Register Success" }

        case ADD_TO_FAVORITE_SUCCESS:
            return { ...state, isLoading: false, error: null, favorites: isPresentInFavorites(state.favorites, action.payload) ? state.favorites.filter((item) => item.id !== action.payload.id) : [action.payload, ...state.favorites] }

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case ADD_TO_FAVORITE_FAILURE:
        case GET_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload, success: null }

        case LOGOUT:
            return initialState;

        case GET_USER_SUCCESS:
            return {...state, isLoading:false, user:action.payload,error:null , favorites: action.payload.favorites}
        default:
            return state;


    }

}