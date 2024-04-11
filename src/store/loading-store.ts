import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ILoadingState {
    isLoading: boolean;
    message: string;
}
const loadingSlice=createSlice({
    name:"loading",
    initialState:{
        isLoading:false,
        message:""
    } as ILoadingState,
    reducers:{
        setLoading(state:ILoadingState,action:PayloadAction<ILoadingState>){
            state.isLoading=action.payload.isLoading;
            state.message=action.payload.message;
        }
    }
});
export const loadingActions = loadingSlice.actions;
export default loadingSlice;