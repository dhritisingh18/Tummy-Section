import React from "react";
import { Password } from "@mui/icons-material";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../State/Authentication/Action";

export const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        fullName: "",
        email: "",
        password: "",
        role: "ROLE_CUSTOMER"
    }
    const handleSubmit = (val) => {
        console.log("val is ", val);
        dispatch(registerUser({ userData: val, navigate }))
    }
    return (
        <div>
            <Typography variant="h5" className="text-center pb-4" >
                Register
            </Typography>

            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                <Form>
                    <Field
                        as={TextField}
                        name="fullName"
                        label="full name"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
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
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="role-simple-select-label">Role</InputLabel>
                        <Field
                            as={Select}
                            labelId="role-simple-select-label"
                            id="role-simple-select"
                            label="role"
                            name="role"
                        >
                            <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                            <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
                        </Field>
                    </FormControl>

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, padding: "1rem" }} >Register</Button>

                    <Typography sx={{ mt: 3 }} variant="body2" align="center">Already have an account? <Button size="small" onClick={() => navigate("/account/login")} >login</Button> </Typography>
                </Form>


            </Formik>
        </div>
    )
}