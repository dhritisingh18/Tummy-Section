import React from "react";
import { Navbar } from "../Navbar";
import { Home } from "../Home/Home";
import { Route, Routes } from "react-router-dom";
import { RestaurantDetails } from "../Restaurant/RestaurantDetails";
import { Cart } from "../Cart/Cart";
import { Profile } from "../ProfileComp/Profile";
import { Auth } from "../Auth/Auth";
import { Orders } from "../ProfileComp/Orders";

export const CustomerRouter = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/account/:register" element={<Home />} />
                <Route path="/restaurant/:city/:title/:id" element={<RestaurantDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/my-profile/*" element={<Profile />} />
            </Routes>
            <Auth/>
        </div>
    )
}