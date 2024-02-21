import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IEvent, IEvents } from "../IEventInterface";
import { events } from "../dummyData";


const initialState: IEvents= {
    events: events,
};

export const eventsSlice = createSlice({
    name: "events",
    initialState: initialState,
    reducers: {
        addEvent: (state, action: PayloadAction<IEvent>) => {
            state.events.push(action.payload);
        },
    },
});

export const eventsActions = eventsSlice.actions;