import { configureStore } from "@reduxjs/toolkit";
import { eventsSlice } from "./events-store";

const store=configureStore({
    reducer:{
        events:eventsSlice.reducer,
    }
});
export default store;