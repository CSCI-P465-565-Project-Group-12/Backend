import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IEvent } from "../IEvent";
import { events } from "../dummyData";

const initialState: IEvent = {
    name: "",
    venueId: "",
    ageRange: "",
    cost: "",
    capacity: 0,
    activityStatus: "",
    startTime: "",
    endTime: "",
    images: [],
};
export const updateEventSlice=createSlice({
    name:"eventToBeUpdated",
    initialState,
    reducers:{
        storeTemporaryEvent:(state:IEvent,action:PayloadAction<IEvent>)=>{
            state.name=action.payload.name;
            state.venueId=action.payload.venueId;
            state.ageRange=action.payload.ageRange;
            state.cost=action.payload.cost;
            state.capacity=action.payload.capacity;
            state.activityStatus=action.payload.activityStatus;
            state.startTime=action.payload.startTime;
            state.endTime=action.payload.endTime;
            state.images=action.payload.images;

        },
        // updateEventDetails:(state:IEvent,action:PayloadAction<IEvent>)=>{
        //     state.title=action.payload.title;
        //     state.date=action.payload.date;
        //     state.time=action.payload.time;
        //     state.venue=action.payload.venue;
        //     state.description=action.payload.description;
        //     state.image=action.payload.image;
        //     const index=events.findIndex((event)=>event.title===state.title);
        //     events[index]=state;
        // },
        deleteEvent:(_,action:PayloadAction<string>)=>{
            const index=events.findIndex((event)=>event.title===action.payload);
            events.splice(index,1);
        }
    }
})
export const updateEventActions=updateEventSlice.actions;
