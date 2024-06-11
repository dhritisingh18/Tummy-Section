import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export const EventCard = () => {
    return (
        <div>
            <Card sx={{ width: 345 }}>
                <CardMedia

                    sx={{ height: 345 }}
                    image="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600" />

                <CardContent>
                    <Typography variant="h5" >
                        A Blast of Dessert
                    </Typography>
                    <Typography variant="body2" >
                        50% Off on your First Order
                    </Typography>

                    <div className="py-2 space-y-2">
                        <p>{"Montreal"}</p>
                        <p className="text-sm text-blue-500">May 16 ,2024 12:00 PM</p>
                        <p className="text-sm text-red-500">May 18 ,2024 12:00 AM</p>


                    </div>
                </CardContent>

                {true && <CardActions>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
                }

            </Card>
        </div>
    )
}