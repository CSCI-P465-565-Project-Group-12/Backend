import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IEvents {
    title: string;
    date: string;
    venue: string;
    image: string;
    time?: string;
    }

const initialState: IEvents = {
    title: "",
    date: "",
    venue: "",
    image: "",
    time: "",
};

export const eventsSlice = createSlice({
    name: "events",
    initialState: initialState,
    reducers: {
        addEvent: (state, action: PayloadAction<IEvents>) => {
            state.title = action.payload.title;
            state.date = action.payload.date;
            state.venue = action.payload.venue;
            state.image = action.payload.image;
            state.time = action.payload.time;

        },
    },
});

export const eventsActions = eventsSlice.actions;