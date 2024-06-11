import React from "react";
import { RestuarantCard } from "../Restaurant/RestaurantCard";
import { useSelector } from "react-redux";

export const Favorite = ()=>{

    const {auth} = useSelector( store => store);
    console.log(auth)
    return(
        <div>

            <h1 className="py-5 text-xl font-semibold text-center">My Favorites</h1>
            <div className="flex flex-wrap gap-3 justify-center">
                {auth.favorites.map((item)=><RestuarantCard item={item}/>)}
            </div>

        </div>
    )
}