import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import { Button, Card } from "@mui/material";
import { Home } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../State/Order/Action";



export const AddressCard = ({ item, showButton }) => {
    const {cart,auth} = useSelector( store => store)
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const handleSelectAddress = async (value) => {
        console.log("value is ", value)
        console.log(cart.cart.items[0].food?.restaurant.id);
        const data ={
            jwt: localStorage.getItem("jwt"),
            order:{
                restaurantId: cart.cart.items[0].food?.restaurant.id,
                deliveryAddress:{
                    fullName : auth.user?.fullName,
                    streetAddress: value.streetAddress,
                    city: value.city,
                    stateProvince: value.state,
                    postalCode: value.pincode,
                    country: "Canada"
                }
            }
        }
        console.log("DATA: ",data)
       await dispatch(createOrder(data))
       navigate("/my-profile/orders");

    }
    return (
        <Card className="flex gap-5 w-64 p-5">
            <HomeIcon />
            <div className="space-y-3 text-gray-500">
                <h1 className="font-semibold text-lg text-white">{item.streetAddress} </h1>
                <p>
                    {item.city} ,{item.stateProvince}, {item.country} , {item.postalCode} 
                </p>
                {showButton && <Button variant="outlined" fullWidth onClick={() => handleSelectAddress(item)}>Select</Button>}
            </div>
        </Card>
    )
}