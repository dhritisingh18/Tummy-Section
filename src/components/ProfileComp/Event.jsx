import React from "react";
import { EventCard } from "./EventCard";

export const Event = ()=>{
    return(
        <div className="mt-5 px-5 flex flex-wrap gap-5">
            {[1,1,1].map((item)=> <EventCard />)}
        </div>
    )
}