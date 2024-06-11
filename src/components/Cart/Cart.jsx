import { Box, Button, Card, Divider, Grid, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { CartItem } from "./CartItem";
import { AddressCard } from "./AddressCard";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { findCart } from "../State/Cart/Action";
import { restaurantReducer } from "../State/Restaurant/Reducer";
import { createOrder } from "../State/Order/Action";
import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";
export  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    outline: "none",
    p: 4,
};
export const Cart = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const {cart,auth} = useSelector( store => store)
    console.log(cart);
    console.log(auth)

    const navigate = useNavigate();
   
    const createOrderUsingSelectedAddress = (value) => {
        console.log(value)
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
        dispatch(createOrder(data))
        // navigate("/my-profile/orders")
    }
    const handleOpenAddressModal = () => {
        setOpen(true)
    }

    const initialValues = {
        streetAddress: "",
        state: "",
        city: "",
        pincode: ""
    }

    // const validationSchema =Yup.object.shape({
    //     streetAddress:Yup.string().required("Street Address is required"),
    //     state:Yup.string().required("State is required"),

    //     pincode:Yup.required("pincode is required"),

    //     city:Yup.string().required("city is required")


    // })
   
 

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (value) => {
        console.log("val ", value)
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
        <>

            <main className="lg:flex justify-between">

                <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
                    {
                        cart.cartItems.map((item) => <CartItem item={item}/>)
                    }


                    <Divider />

                    <div className="billDetails px-5 text-sm">
                        <p className="font-extralight py-5">Bill Details </p>
                        <div className="space-y-3">
                            <div className="flex justify-between text-gray-400">
                                <p>Item Total</p>
                                <p>${cart.cart.total} </p>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <p>Delivery Fee</p>
                                <p>$ {(cart.cart.total * 0.13).toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <p>GST and Restaurant Charges</p>
                                <p>$ {(cart.cart.total * 0.05).toFixed(2)}</p>
                            </div>
                        </div>
                        <Divider />
                        <div className="flex justify-between text-gray-400">
                            <p>Total Pay</p>
                            <p>$ {(cart.cart.total* (1 + .05 + .13)).toFixed(2) }</p>

                        </div>

                    </div>
                </section>

                <Divider orientation="vertical" flexItem />
                <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
                    <div>
                        <h1 className="font-semibold text-center text-2xl py-10">Choose Delivery Address</h1>

                        <div className="flex gap-5 flex-wrap ">
                            {
                                auth.user.addresses.map((item) => <AddressCard item={item} showButton={true} />)
                            }
                            <Card className="flex gap-5 w-64 p-5">
                                <AddLocationAltIcon />
                                <div className="space-y-3 text-gray-500">
                                    <h1 className="font-semibold text-lg text-white">Add new Address </h1>
                                    <Button variant="outlined" fullWidth onClick={handleOpenAddressModal}>Add</Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Formik initialValues={initialValues}
                        //    validationSchema={validationSchema}
                        onSubmit={handleSubmit}>
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="streetAddress"
                                        label="StreetAddress"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="state"
                                        label="state"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="city"
                                        label="city"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="pincode"
                                        label="pincode"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" type="submit" color="primary" fullWidth >Deliver Here</Button>
                                </Grid>

                            </Grid>
                        </Form>
                    </Formik>
                </Box>
            </Modal>
        </>
    )
}