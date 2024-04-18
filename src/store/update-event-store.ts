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
    coverImg: "",
};
export const updateEventSlice=createSlice({
    name:"updateEvents",
    initialState,
    reducers:{
        // storeTemporaryEvent:(state:IEvent,action:PayloadAction<IEvent>)=>{
        //     state.name=action.payload.name;
        //     state.venueId=action.payload.venueId;
        //     state.ageRange=action.payload.ageRange;
        //     state.cost=action.payload.cost;
        //     state.capacity=action.payload.capacity;
        //     state.activityStatus=action.payload.activityStatus;
        //     state.startTime=action.payload.startTime;
        //     state.endTime=action.payload.endTime;
        //     state.images=action.payload.images;
        //     state.coverImg=action.payload.coverImg;
        // },
        updateEventDetails:(state:IEvent,action:PayloadAction<IEvent>)=>{
            state.name=action.payload.name;
            state.venueId=action.payload.venueId;
            state.ageRange=action.payload.ageRange;
            state.cost=action.payload.cost;
            state.capacity=action.payload.capacity;
            state.activityStatus=action.payload.activityStatus;
            state.startTime=action.payload.startTime;
            state.endTime=action.payload.endTime;
            state.images=action.payload.images;
            state.coverImg=action.payload.coverImg;
        },
        deleteEvent:(_,action:PayloadAction<string>)=>{
            const index=events.findIndex((event)=>event.title===action.payload);
            events.splice(index,1);
        }
    }
})
export const updateEventActions=updateEventSlice.actions;
