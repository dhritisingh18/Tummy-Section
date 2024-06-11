import { type } from "@testing-library/user-event/dist/type";
import axios from "axios"
import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "../State/Authentication/ActionType";

export const API_URL = "http://localhost:5454";


export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

