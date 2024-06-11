import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USERS_ORDER_FAILURE, GET_USERS_ORDER_REQUEST, GET_USERS_ORDER_SUCCESS } from "./ActionType"
import { api } from "../../config/api";

export const createOrder = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_ORDER_REQUEST })
        try {

            const { data } = await api.post(`api/order`, reqData.order, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`
                }
            })

            // if (data.payment_url) {
            //     window.location.href = data.payment_url;
            // }

            console.log("Order create ", data);
            dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
        }
        catch (error) {
            console.log("Error ", error);
            dispatch({ type: CREATE_ORDER_FAILURE, payload: error })
        }
    }
}


export const getUsersOrders = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: GET_USERS_ORDER_REQUEST })
        try {

            const { data } = await api.get(`api/order/user`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })


            console.log("Get users orders ", data);
            dispatch({ type: GET_USERS_ORDER_SUCCESS, payload: data });
        }
        catch (error) {
            console.log("Error ", error);
            dispatch({ type: GET_USERS_ORDER_FAILURE, payload: error })
        }
    }
}