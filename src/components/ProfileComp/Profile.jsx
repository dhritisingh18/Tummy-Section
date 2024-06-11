import React, { useState } from "react";
import { ProfileNavigation } from "./ProfileNavigation";
import { Route, Routes } from "react-router-dom";
import { Favorite } from "./Favorite";
import { UserProfile } from "./UserProfile";
import { Orders } from "./Orders";
import { Address } from "./Address";
import { Notification } from "./Notification";
import { Event } from "./Event";
import { Logout } from "./Logout";

export const Profile = () => {
const [openSideBar , setOpenSideBar] = useState(false);

    return (
        <div className="lg:flex justify-between">

            <div className="sticky h-[80vh] lg:w-[20%] ">
                <ProfileNavigation />
            </div>

            <div className="lg:w-[80%]">
                <Routes>
                    <Route path="/" element={<UserProfile />} ></Route>
                    <Route path="/orders" element={<Orders />} ></Route>

                    <Route path="/address" element={<Address />} ></Route>

                    <Route path="/favorites" element={<Favorite />} ></Route>
                    <Route path="/notification" element={<Notification />} ></Route>

                    <Route path="/events" element={<Event />} ></Route>



                </Routes>
            </div>
        </div>
    )
}