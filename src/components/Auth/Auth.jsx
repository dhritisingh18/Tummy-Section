import { Box, Modal } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { style } from "../Cart/Cart";
import { Register } from "./RegisterForm";
import { LoginForm } from "./LoginForm";

export const Auth = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const handleOnClose = () => {
        navigate("/")
    }


    return (

        <>

            <Modal open={location.pathname === "/account/register" || location.pathname === "/account/login"} onClose={handleOnClose}>

                <Box sx={style}>
                    {location.pathname==="/account/register" ? <Register /> : <LoginForm />}
                </Box>

            </Modal>

        </>
    )
}