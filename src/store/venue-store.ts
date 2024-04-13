import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const intialState:IVenue={
    name:'',
    state:'',
    city:'',
    street:'',
    zipcode:'',
    venueStatus:'',
    details:{
        description:'',
        price:'',
        venueNotes:'',
        eventOrganizer:''
    },
    venueType:'',
    images:[],
    Reservations:[],
    activities:[]
}

const venueSlice=createSlice({
    name:'venue',
    initialState:intialState,
    reducers:{
        setVenue(state:IVenue,action:PayloadAction<IVenue>){
            state.name=action.payload.name;
            state.state=action.payload.state;
            state.city=action.payload.city;
            state.street=action.payload.street;
            state.zipcode=action.payload.zipcode;
            state.venueStatus=action.payload.venueStatus;
            state.details=action.payload.details;
            state.venueType=action.payload.venueType;
            state.images=action.payload.images;
        }
    }
})
export const venueActions=venueSlice.actions;
export default venueSlice;