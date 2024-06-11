import axios from "axios";
import { api } from "../../config/api";
import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_EVENTS_FAILURE, CREATE_EVENTS_REQUEST, CREATE_EVENTS_SUCCESS, CREATE_RESTAURANT_FAILURE, CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, DELETE_EVENTS_FAILURE, DELETE_EVENTS_REQUEST, DELETE_EVENTS_SUCCESS, DELETE_RESTAURANT_FAILURE, DELETE_RESTAURANT_REQUEST, DELETE_RESTAURANT_SUCCESS, GET_ALL_EVENTS_REQUEST, GET_ALL_EVENTS_SUCCESS, GET_ALL_RESTAURANTS_FAILURE, GET_ALL_RESTAURANTS_REQUEST, GET_ALL_RESTAURANTS_SUCCESS, GET_RESTAURANTS_CATEGORY_FAILURE, GET_RESTAURANTS_CATEGORY_REQUEST, GET_RESTAURANTS_CATEGORY_SUCCESS, GET_RESTAURANTS_EVENTS_FAILURE, GET_RESTAURANTS_EVENTS_REQUEST, GET_RESTAURANTS_EVENTS_SUCCESS, GET_RESTAURANT_BY_ID_FAILURE, GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS, GET_RESTAURANT_BY_USER_ID_FAILURE, GET_RESTAURANT_BY_USER_ID_REQUEST, GET_RESTAURANT_BY_USER_ID_SUCCESS, UPDATE_RESTAURANT_FAILURE, UPDATE_RESTAURANT_REQUEST, UPDATE_RESTAURANT_STATUS_FAILURE, UPDATE_RESTAURANT_STATUS_REQUEST, UPDATE_RESTAURANT_STATUS_SUCCESS, UPDATE_RESTAURANT_SUCCESS } from "./ActionType"
import { type } from "@testing-library/user-event/dist/type";
import { Category } from "@mui/icons-material";


export const getAllRestaurantsAction = (token) => async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });

    try {
        const { data } = await api.get(`/api/restaurants`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data });
        console.log("GET ALL RESTAURANTS DATA ", data);

    }
    catch (error) {
        console.log("error ", error);
        dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: error })
    }
}

export const getRestaurantById = (reqData) => { return  async (dispatch) => {
    console.log(reqData);
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });

    try {
        const response = await api.get(`/api/restaurants/${reqData.id}`, {
            headers: {
                Authorization: `Bearer ${reqData.token}`
            },
        });
        console.log("GET RESTAURANT BY ID KE PEHLE ", response.data);
        dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: response.data });
        console.log("GET RESTAURANT BY ID ", response);

    }
    catch (error) {
        console.log("error ", error);
        dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error })
    }
}
}


export const getRestaurantByUserId = (jwt) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });

    try {
        const { data } = await api.get(`/api/admin/restaurants/user`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
        console.log("GET RESTAURANT BY USER ID ", data);

    }
    catch (error) {
        console.log("error ", error);
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error })
    }
}


export const createRestaurant = (reqData) => async (dispatch) => {

    console.log("TOKEN ----- ", reqData.token);
    dispatch({ type: CREATE_RESTAURANT_REQUEST });

    try {
        const { data } = await api.post(`/api/admin/restaurants`, reqData.data, {
            headers: {
                Authorization: `Bearer ${reqData.token}`
            },
        });
        dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
        console.log("RESTAURANT CREATION", data);

    }
    catch (error) {
        console.log("error ", error);
        dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error })
    }
}



export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => async (dispatch) => {

    dispatch({ type: UPDATE_RESTAURANT_REQUEST });

    try {
        const response = await api.put(`/api/admin/restaurants/${restaurantId}`, restaurantData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });
        dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: response.data });
        console.log("RESTAURANT UPDATION", response);

    }
    catch (error) {
        console.log("error ", error);
        dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: error })
    }
}


export const deleteRestaurant = ({ restaurantId, jwt }) => async (dispatch) => {

    dispatch({ type: DELETE_RESTAURANT_REQUEST });

    try {
        const response = await api.delete(`/api/admin/restaurants/${restaurantId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });
        dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
        console.log("RESTAURANT DELETED", response);

    }
    catch (error) {
        console.log("error ", error);
        dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error })
    }
}


export const updateRestaurantStatus = ({ restaurantId, jwt }) => async (dispatch) => {

    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });

    try {
        const response = await api.put(`/api/admin/restaurants/${restaurantId}/status`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });
        dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: response.data });
        console.log("RESTAURANT STATUS UPDATION", response);

    }
    catch (error) {
        console.log("error ", error);
        dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error })
    }
}


export const createEventAction = ({ data, jwt, restaurantId }) => async (dispatch) => {

    dispatch({ type: CREATE_EVENTS_REQUEST });

    try {
        const response = await api.post(`/api/admin/events/${restaurantId}`, data, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });
        dispatch({ type: CREATE_EVENTS_SUCCESS, payload: response.data });
        console.log("RESTAURANT Creation of Events", response);

    }
    catch (error) {
        console.log("error ", error);
        dispatch({ type: CREATE_EVENTS_FAILURE, payload: error })
    }
}


export const getAllEvents = (jwt) => async (dispatch) => {

    dispatch({ type: GET_ALL_EVENTS_REQUEST });

    try {
        const response = await api.get(`/api/events`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });
        dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: response.data });
        console.log("GEt all  Events", response);

    }
    catch (error) {
        console.log("error ", error);
        dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: error })
    }
}


export const deleteEvent = ({eventId,jwt}) => async (dispatch) => {

    dispatch({ type: DELETE_EVENTS_REQUEST });

    try {
        const response = await api.delete(`/api/admin/events${eventId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });
        dispatch({ type: DELETE_EVENTS_SUCCESS, payload: eventId });
        console.log("DElete Events", response);

    }
    catch (error) {
        console.log("error ", error);
        dispatch({ type: DELETE_EVENTS_FAILURE, payload: error })
    }
}


export const getRestaurantsEvent = ({restaurantId,jwt}) => async (dispatch) => {

    dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST });

    try {
        const response = await api.get(`/api/admin/events/restaurant${restaurantId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });
        dispatch({ type: GET_RESTAURANTS_EVENTS_SUCCESS, payload: response.data });
        console.log("GEt restaurants Events", response);

    }
    catch (error) {
        console.log("error ", error);
        dispatch({ type: GET_RESTAURANTS_EVENTS_FAILURE, payload: error })
    }
}


export const createCaategoryAction = ({ reqData, jwt }) => async (dispatch) => {

    dispatch({ type: CREATE_CATEGORY_REQUEST });

    try {
        const response = await api.post(`/api/admin/category/`, reqData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: response.data });
        console.log(" Creation of Category", response);

    }
    catch (error) {
        console.log("error ", error);
        dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error })
    }
}


export const getRestaurantByCategory = ( id,jwt ) => async (dispatch) => {

    dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });

    try {
        const response = await api.get(`/api/category/restaurant/${id}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
        });
        dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: response.data });
        console.log(" Get restaurnats Category", response);

    }
    catch (error) {
        console.log("error ", error);
        dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: error })
    }
}

// export const getRestaurantsCategory = ( jwt,name ) => async (dispatch) => {

//     dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });

//     try {
//         const response = await api.get(`/api/category/restaurant`, {
//             headers: {
//                 Authorization: `Bearer ${jwt}`
//             },
//         });
//         dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: response.data });
//         console.log(" Get restaurnats Category", response);

//     }
//     catch (error) {
//         console.log("error ", error);
//         dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: error })
//     }
// }