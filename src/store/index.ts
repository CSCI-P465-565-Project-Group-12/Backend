import { configureStore } from "@reduxjs/toolkit";
import { eventsSlice } from "./events-store";
import { updateEventSlice } from "./update-event-store";

const store=configureStore({
    reducer:{
        events:eventsSlice.reducer,
        updateEvents:updateEventSlice.reducer
    }
});
export default store;