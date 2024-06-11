import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../State/Authentication/Action";

export const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        email: "",
        password: ""
    }
    const handleSubmitButton = (values) => {
        console.log(values);
        dispatch(loginUser({userData: values,navigate}))
    }

    return (
        <div>
            <Typography variant="h5" className="text-center pb-4" >
                Login
            </Typography>

            <Formik onSubmit={handleSubmitButton} initialValues={initialValues}>
                <Form>
                    <Field
                        as={TextField}
                        name="email"
                        label="email"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                     <Field
                        as={TextField}
                        name="password"
                        label="password"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        type="password"
                        
                    />

                    <Button type="submit" variant="contained" fullWidth sx={{mt:2 , padding:"1rem"}} >Login</Button>

                    <Typography sx={{mt:3}} variant="body2" align="center">Don't have an account? <Button size="small" onClick={()=>navigate("/account/register")} >register</Button> </Typography>  
                </Form>

                
            </Formik>
        </div>
    )
}