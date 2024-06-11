import axios from "axios"
import { API_URL, api } from "../../config/api"
import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import { useNavigate } from "react-router-dom"


export const registerUser = (reqData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST })
    try {
        const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData)
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt)
        }
        // if (data.role === "ROLE_RESTAURANT_OWNER") {
        //     reqData.navigate("/admin/restaurant")
        // }
        // else {
            reqData.navigate("/")
        // }

        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt })
        console.log("Register success ", data);
    }
    catch (error) {
        console.log("error ", error);
        dispatch({ type: REGISTER_FAILURE, payload: error })
    }




}


export const loginUser = (reqData) => async (dispatch) => {

    dispatch({ type: LOGIN_REQUEST })

    try {
        const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.userData);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
        }
        // if (data.role === "ROLE_RESTAURANT_OWNER") {
        //     reqData.navigate("/admin/restaurant");
        // }
        // else {
            reqData.navigate("/")
        // }

        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt })
        console.log("Login success ", data)

    }
    catch (error) {
        console.log("error ", error);
        dispatch({ type: LOGIN_FAILURE, payload: error })
    }

}

export const getUser = (jwt) => async (dispatch) => {

    dispatch({ type: GET_USER_REQUEST })
    try {
        const { data } = await api.get(`${"/api/user/profile"}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        console.log("USer Profile ", data);
        dispatch({ type: GET_USER_SUCCESS, payload: data })

    }
    catch (error) {
        console.log("error ", error);
        dispatch({ type: GET_USER_FAILURE, payload: error })
    }
}


export const addToFavorite = ( jwt, id ) => async (dispatch) => {
    console.log("ID" ,id);
    dispatch({ type: ADD_TO_FAVORITE_REQUEST })
    try {

        const { data } = await api.put(`/api/restaurants/${id}/add-to-favorites`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: data })
        console.log("add to fav restaurant", data);

    }
    catch (error) {
        console.log("error ", error);
        dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: error });
    }
}

export const logout = () => async (dispatch) => {
    try {
        localStorage.clear();
        dispatch({ type: LOGOUT });
        console.log("LOGOUT");
        useNavigate("/");
    }
    catch (error) {
        console.log("error ", error);
    }
}