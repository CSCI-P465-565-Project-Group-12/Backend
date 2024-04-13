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
        },
        setVenueOwnerProfile(state:IVenueOwnerProfile,action:PayloadAction<IVenueOwnerProfile>){
            state.first_name=action.payload.first_name;
            state.last_name=action.payload.last_name;
            state.contact_number=action.payload.contact_number;
            state.bio=action.payload.bio;
            state.address=action.payload.address;
        },
        unSetVenueOwner(state:IVenueOwnerProfile){
            state.venue_owner={
                email:"",
                username:""
            };
        }
    }
});
export const venueOwnerActions=venueOwnerSlice.actions;
export default venueOwnerSlice;