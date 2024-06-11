import { Chip, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findCart, removeCartItem, updateCartItem } from "../State/Cart/Action";


export const CartItem = ({ item }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth, cart } = useSelector(store => store);
    const jwt = localStorage.getItem("jwt");

     useEffect(()=>{
        dispatch(findCart(jwt))
    },[])

    const handleUpdateCartItem = async (value) => {
        if (value == -1 && item.quantity == 1) {
           await handleRemoveCartItem();
            dispatch(findCart(jwt))
        }
        else {
            const data ={
                cartItemId: item.id,
                quantity: item.quantity + value
            }

           const updateCart =async ()=>{
            try{

            
           await dispatch(updateCartItem({data,jwt}))
           dispatch(findCart(jwt))
            }
            catch(e){
                console.log(e)
            }
           } 
           updateCart();
            
        }
    }

    const handleRemoveCartItem = () => {
        console.log("REMOVAL ENTERED")
        const reqData = {
            cartItemId: item.id,
            jwt: auth.jwt || jwt
        }
        // const removeCart = async ()=>{
        //     try{
        //         await dispatch(removeCartItem(reqData))
        //         dispatch(findCart(jwt))
        //     }
        //     catch(e){
        //         console.log("Error ",e);
        //     }
        // }
        dispatch(removeCartItem(reqData))
      
    }


    return (
        <div className="px-5">
            <div className="lg:flex items-cover lg:space-x-5">
                <div>
                    <img className="w-[5rem] h-[5rem] object-cover" src={item.food.images[0]} />

                </div>

                <div className="flex items-center justify-between lg:w-[70%]">
                    <div className="space-y-1 lg:space-y-3 w-full">
                        <p>{item.food.name}</p>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-1">
                                <IconButton onClick={() => handleUpdateCartItem(-1)}>
                                    <RemoveCircleOutlineIcon />
                                </IconButton>

                                <div className="w-5 h-5 text-xs flex items-center justify-center">
                                    {item.quantity}
                                </div>

                                <IconButton onClick={() => handleUpdateCartItem(1)}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </div>

                        </div>
                    </div>
                    <p>${item.totalPrice}</p>
                </div>
            </div>

            <div className="pt-3 space-x-2">
                {item.ingredients.map((ingredientItem) => <Chip label={ingredientItem} />)}
            </div>
        </div>
    )
}