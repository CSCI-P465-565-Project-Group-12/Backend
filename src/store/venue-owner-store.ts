import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:IVenueOwnerProfile={
    venue_owner:{
        email:"",
        username:""
    },
    first_name:"",
    last_name:"",
    contact_number:"",
    bio:"",
    address:""
};
const venueOwnerSlice=createSlice({
    name:"venueOwner",
    initialState,
    reducers:{
        setIntialVenueOwner(state:IVenueOwnerProfile,action:PayloadAction<IVenueOwnerProfile>){
            state.venue_owner=action.payload.venue_owner;
        }
    }
});
export const venueOwnerActions=venueOwnerSlice.actions;
export default venueOwnerSlice;