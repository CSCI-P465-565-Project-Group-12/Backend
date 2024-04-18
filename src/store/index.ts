import { configureStore } from "@reduxjs/toolkit";
import { eventsSlice } from "./events-store";
import { updateEventSlice } from "./update-event-store";
import loadingSlice from "./loading-store";
import loginSlice from "./login-store";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import venueOwnerSlice from "./venue-owner-store";

const persistConfig = {
    key: "venueOwner",
    storage
};

const store=configureStore({
    reducer:{
        venueOwner:persistReducer(persistConfig,venueOwnerSlice.reducer),
        events:eventsSlice.reducer,
        updateEvents:updateEventSlice.reducer,
        loading:loadingSlice.reducer,
        login:persistReducer(persistConfig,loginSlice.reducer)
    }
});
export default store;

export const persistor=persistStore(store);