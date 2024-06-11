import { Card, Chip, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../State/Authentication/Action";
import { isPresentInFavorites } from "../config/logic";
import { store } from "../State/store";
import { getRestaurantById } from "../State/Restaurant/Action";

export const RestuarantCard = ({ item }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {auth} = useSelector(store => store)
    // const {restaurant} =useSelector(store => store)
    console.log(auth)
    // console.log("RESTAURANT ", item);
    // const restuantFetched = restaurant.restaurant;
    // console.log("FETCHED RESTUARANT",restuantFetched)

    // useEffect(()=>{
    //     const reqData={
    //         token:jwt,
    //         id: item.id
    //     }
    //     console.log("REQUEST DATA USE EFEFECT ",reqData)
    //   dispatch(getRestaurantById(reqData))
    // },[])

    const handleFavorite = ()=>{
        const restaurantId = item.id;
        dispatch( addToFavorite(jwt, restaurantId))
    }
    const handleNavigateToRestaurant = (item) =>{
        console.log("ITEM : ",item)
        // dispatch(getRestaurantById({token:jwt,id: item.id}))
        // console.log("navigate wala",restaurant)
        navigate(`/restaurant/${item.address.city}/${item.name }/${item.id}`)
    }


    return (
        <Card className="w-[18rem]">
            <div className={`${item.open ? 'cursor-pointer' : "cursor-not-allowed"} relative`}>
                <img className="w-full h-[10rem] rounded-t-md object-cover" src={item.images[0]} alt=""></img>


                <Chip
                    size="small" className="absolute top-2 left-2" color={item.open ? "success" : "error"} label={item.open ? "Open" : "Closed"}>

                </Chip>
            </div>

            <div className="p-4 textPart lg:flex w-full justify-betweem">
                <div className="space-y-1">
                    <p onClick={()=>handleNavigateToRestaurant(item)} className="font-semibold text-lg cursor-pointer">{item.name!=null ? item.name : item.title}</p>
                    <p className="text-gray-500 tex-sm"> {item.description} </p>
                </div>
            </div>
            <div>
                <IconButton onClick={handleFavorite}>
                    {isPresentInFavorites(auth.favorites, item)? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorderIcon />}
                </IconButton>
            </div>
        </Card>
    )
}