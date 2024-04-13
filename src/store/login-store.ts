import { createSlice } from "@reduxjs/toolkit";

const loginSlice=createSlice({
    name:"login",
    initialState:{
        isLoggedIn:false,
    },
    reducers:{
        setLogin(state){
            state.isLoggedIn=true;
        },
        logout(state){
            state.isLoggedIn=false;
            localStorage.removeItem("token");
        }
    }
});
export const loginActions=loginSlice.actions;
export default loginSlice;