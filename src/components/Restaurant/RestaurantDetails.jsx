import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { MenuCard } from "./MenuCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantByCategory, getRestaurantById } from "../State/Restaurant/Action";
import { getMenuItemsByRestaurantId } from "../State/Menu/Action";
import Restaurant from "./Restaurant.css"

export const RestaurantDetails = () => {
    console.log("RESTAURANT DETAILS COMPONENT")
    const { id, city } = useParams();
    console.log('Params:', { id, city });
    const { auth, restaurant } = useSelector(store => store);
    const { menu } = useSelector(store => store)
    const [selectedCategory, setSelectedCategory] = useState("");
    console.log("RESTAURANT DETAIL ", restaurant);

    const foodTypes = [
        { label: "All", value: "all" },
        { label: "Vegetarian Only", value: "vegetarian" },
        { label: "Non-Vegetarian", value: "non_vegetarian" },
        { label: "Seasonal", value: "seasonal" }
    ]

    const [foodType, setFoodType] = useState("all");

    const dispatch = useDispatch();


    useEffect(() => {
        const fetchData = async () => {


            try {


                console.log("ENtering use effect")
                const reqData = {
                    token: localStorage.getItem("jwt"),
                    id: id
                }
                // vegetarian=false
                // nonVeg=true
                // foodCategory="Rolls"
                // seasonal=false

                dispatch(getRestaurantById(reqData))
                dispatch(getRestaurantByCategory(id, localStorage.getItem("jwt")))
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])


    useEffect(() => {
        const requestData = {
            jwt: localStorage.getItem("jwt"),
            restaurantId: id,
            vegetarian: foodType === "vegetarian",
            nonVeg: foodType === "non_vegetarian",
            foodCategory: selectedCategory,
            seasonal: foodType === "seasonal"
        }
        console.log(requestData)

        dispatch(getMenuItemsByRestaurantId(requestData))

    }, [selectedCategory,foodType])



    // const categories = [
    //     "Burger", "Pizza", "Biryani", "Dessert", "Juice", "Coffee", "Chinese", "Sushi", "Pasta", "Sandwich", "Rolls", "Soup", "Chicken"
    // ]

   

    const handleFilter = (e) => {
        console.log(e.target.value, e.target.name)
        setFoodType(e.target.value);
    }


    const handleFilterCategogry = (e,value) => {
        console.log(e.target.value, e.target.name)
        setSelectedCategory(value);
        }

    // const menu = [1, 1, 1, 1, 1, 1, 1, 1];
    if (!restaurant || !restaurant.restaurant) {
        return <div>Loading...</div>
    }


    return (
        <div className="px-5 lg:px-20">

            <section>
                <h3 className="text-gray-500 py-2 mt-10">Home/{restaurant.restaurant.address.country}/{restaurant.restaurant.name}/{restaurant.restaurant.id}</h3>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <img className="w-full h-[50vh] object-cover object-center" src={restaurant.restaurant.images[0]} alt="Centered"></img>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img className="w-full h-[40vh] object-cover" src={restaurant.restaurant.images[1]} alt="">
                            </img>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img className="w-full h-[40vh] object-cover" src={restaurant.restaurant.images[2]} alt="">
                            </img>
                        </Grid>
                    </Grid>
                </div>

                <div className="pt-3 pb-5">
                    <h1 className="text-4xl font-semibold">{restaurant.restaurant.name}</h1>
                    <p className="text-gray-500 flex items-center gap-3"><span>{restaurant.restaurant.open} </span></p>
                    <p className="text-gray-500 flex items-center gap-3">
                        <span>
                            {restaurant.restaurant.description}</ span>
                    </p>
                    <div className="flex flex-col justify-center">
                        <span>
                            <LocationOnIcon /> {restaurant.restaurant.address.city} , {restaurant.restaurant.address.stateProvince}
                        </span>
                        <span>
                            <CalendarTodayIcon /> {restaurant.restaurant.openingHours}</span>
                    </div>


                </div>
            </section>

            <Divider />
            {restaurant.restaurant.open?
            <section className="pt-[2rem] lg:flex relative">
                <div className="space-y-10 lg:w-[20%] fliter p-5 shadow-md">
                    <div className="box space-y-5 lg:sticky top-28">
                        <div>
                            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>Food Type</Typography>

                            <FormControl className="py-10 space-y-5" component={"fieldset"}>
                                <RadioGroup onChange={handleFilter} name="food_type" value={foodType}>
                                    {
                                        foodTypes.map((item) => <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} ></FormControlLabel>)
                                    }
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Divider />
                        <div>
                            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>Food Category</Typography>

                            <FormControl className="py-10 space-y-5" component={"fieldset"}>
                                <RadioGroup onChange={handleFilterCategogry}
                                 name="category" 
                                 value={selectedCategory}
                                 >
                                    {
                                        restaurant.categories.map((item) => <FormControlLabel key={item} value={item.name} control={<Radio />} label={item.name} ></FormControlLabel>)
                                    }
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>


                </div>
                <div className="space-y-5 lg:w-[80%] lg:pl-10">
                    {menu.menuItems.map((item) => <MenuCard item={item} />)}

                </div>
            </section>:<img className="image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDfQFbFw-LFAiNFvT0JRjAA1VSzQv17YcAwA&s" alt="Centered"></img>}
        </div>

    )
}