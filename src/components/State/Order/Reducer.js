import { GET_USERS_ORDER_FAILURE, GET_USERS_ORDER_REQUEST, GET_USERS_ORDER_SUCCESS } from "./ActionType"

const initialState = {
    loading: false,
    orders: [],
    error: null,
}


export const orderReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case GET_USERS_ORDER_REQUEST:
            return { ...state, error: null, loading: true }
        case GET_USERS_ORDER_SUCCESS:
            return { ...state, error: null, orders: payload, loading: false }
        case GET_USERS_ORDER_FAILURE:
            return { ...state, loading: false, error: payload }

        default:
            return state;
    }
}