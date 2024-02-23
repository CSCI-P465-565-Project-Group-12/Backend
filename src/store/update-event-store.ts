import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IEvent } from "../IEventInterface";
import { events } from "../dummyData";

const initialState: IEvent = {
    title: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    image: "",
};
export const updateEventSlice=createSlice({
    name:"eventToBeUpdated",
    initialState,
    reducers:{
        storeTemporaryEvent:(state:IEvent,action:PayloadAction<IEvent>)=>{
            state.title=action.payload.title;
            state.date=action.payload.date;
            state.time=action.payload.time;
            state.venue=action.payload.venue;
            state.description=action.payload.description;
            state.image=action.payload.image;

        },
        updateEventDetails:(state:IEvent,action:PayloadAction<IEvent>)=>{
            state.title=action.payload.title;
            state.date=action.payload.date;
            state.time=action.payload.time;
            state.venue=action.payload.venue;
            state.description=action.payload.description;
            state.image=action.payload.image;
            const index=events.findIndex((event)=>event.title===state.title);
            events[index]=state;
        },
        deleteEvent:(_,action:PayloadAction<string>)=>{
            const index=events.findIndex((event)=>event.title===action.payload);
            events.splice(index,1);
        }
    }
})
export const updateEventActions=updateEventSlice.actions;
