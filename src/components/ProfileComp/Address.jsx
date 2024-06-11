import React from "react";
import { useSelector } from "react-redux";
import { AddressCard } from "../Cart/AddressCard";

export const Address = ()=>{

    const {auth} = useSelector( state => state);
    console.log(auth);

    const createOrderUsingSelectedAddress = ()=>{

    }
    return(
        <div className="m-10">
        <div className="flex gap-5 flex-wrap justify-center">

                            {
                                auth.user.addresses.map((item) => <AddressCard handleSelectAddress={createOrderUsingSelectedAddress} item={item} showButton={true} />)
                            }
        </div>
        </div>
    )
}