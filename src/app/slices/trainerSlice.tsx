import { createSlice, createAsyncThunk, Dispatch, AnyAction } from "@reduxjs/toolkit";
import {RootState} from '../store';
import axios from "../../config/axios";
import { ITrainerState } from "../../utils/entity/TrainerEntity";

const initialValue: ITrainerState ={
    isLoading: false,
    isLoadingImage: false,
    isLoadingBanner: false,
    isProfile: false,
    trainerInfo: null,
    profileInfo: null,
    profileImage: null,
    bannerImage: null,
    tags: null,
    availabeDates: null
}

export const getTrainerInfo =  createAsyncThunk<any, void, {dispatch?: Dispatch<AnyAction>}>(
    "trainer/getTrainerInfo",
    async () =>{
        const response = await axios.get("/trainer/getTrainer-info");
        return response.data;
    }
)

export const createProfile = createAsyncThunk<any, any, {dispatch?: Dispatch<AnyAction>}>(
    "trainer/createProfile",
    async (profileData: any) =>{
        const response = await axios.post("/trainer/create-profile", profileData )
        return response.data;
    }
)

export const getTrainerProfile =  createAsyncThunk<any, void, {dispatch?: Dispatch<AnyAction>}>(
    "trainer/getTrainerProfile",
    async () =>{
        const response = await axios.get("/trainer/getTrainer-profile");
        return response.data;
    }
)

export const uploadProfileImage =  createAsyncThunk<any, any, {dispatch?: Dispatch<AnyAction>}>(
    "trainer/uploadProfileImage",
    async (image: any) =>{
        const response = await axios.post("/trainer/upload-profile-image", {image: image});
        return response.data;
    }
)

export const uploadBannerImage =  createAsyncThunk<any, any, {dispatch?: Dispatch<AnyAction>}>(
    "trainer/uploadBannerImage",
    async (image: any) =>{
        const response = await axios.post("/trainer/upload-banner-image", {image: image});
        return response.data;
    }
)

export const getTags =  createAsyncThunk<any, void, {dispatch?: Dispatch<AnyAction>}>(
    "trainer/getTags",
    async () =>{
        const response = await axios.get("/trainer/getTags");
        return response.data;
    }
)

export const getTrainerAvailableDates =  createAsyncThunk<any, void, {dispatch?: Dispatch<AnyAction>}>(
    "trainer/getTrainerAvailableDates",
    async () =>{
        const response = await axios.get("/trainer/getTrainer-available-dates");
        return response.data;
    }
)

export const addAvailableDate =  createAsyncThunk<any, any, {dispatch?: Dispatch<AnyAction>}>(
    "trainer/addAvailableDate",
    async ({selectedDay, selectedHours}) =>{
        try{
            console.log("selectedDay: ",selectedDay)
            const formattedSelectedDay = new Date(selectedDay.getTime() - selectedDay.getTimezoneOffset() * 60000).toISOString();
            console.log("Formatted selectedDay: ",formattedSelectedDay)
            const response = await axios.post("/trainer/add-available-date", {date: formattedSelectedDay, time: selectedHours});
            return response.data;
        }catch(err: any){
            console.error(err.response.data)
            throw Error(err.response.data.error)
        }
    }
)

export const trainerSlice = createSlice({
    name: "trainer",
    initialState: initialValue,
    reducers: {
        loading: (state, action) =>{
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTrainerInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTrainerInfo.fulfilled, (state,action) => {
                state.isLoading = false;
                state.trainerInfo = action.payload.trainerInfo;
                state.isProfile = action.payload.isProfile;
                state.profileImage = action.payload.profileImage;
            })
            .addCase(getTrainerInfo.rejected, (state) => {
                state.isLoading = false;
                state.trainerInfo = null;
                state.isProfile = false;
                state.profileImage = null;
            })
            .addCase(createProfile.pending, (state) => {
                state.isLoadingImage = true;
            })
            .addCase(createProfile.fulfilled, (state,action) => {
                state.isLoadingImage = false;
            })
            .addCase(createProfile.rejected, (state) => {
                state.isLoadingImage = false;
            })
            .addCase(getTrainerProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTrainerProfile.fulfilled, (state,action) => {
                state.isLoading = false;
                state.profileInfo = action.payload.profileInfo;
            })
            .addCase(getTrainerProfile.rejected, (state) => {
                state.isLoading = false;
                state.profileInfo = null;
            })
            .addCase(uploadProfileImage.pending, (state) => {
                state.isLoadingImage = true;
            })
            .addCase(uploadProfileImage.fulfilled, (state,action) => {
                state.isLoadingImage = false;
                state.profileImage = action.payload.profileImage;
            })
            .addCase(uploadProfileImage.rejected, (state) => {
                state.isLoadingImage = false;
                state.profileImage = null;
            })
            .addCase(uploadBannerImage.pending, (state) => {
                state.isLoadingBanner = true;
            })
            .addCase(uploadBannerImage.fulfilled, (state,action) => {
                state.isLoadingBanner = false;
                state.bannerImage = action.payload.bannerImage;
            })
            .addCase(uploadBannerImage.rejected, (state) => {
                state.isLoadingBanner = false;
                state.bannerImage = null;
            })
            .addCase(getTags.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTags.fulfilled, (state,action) => {
                state.isLoading = false;    
                state.tags = action.payload.tags;
            })
            .addCase(getTags.rejected, (state) => {
                state.isLoading = false;
                state.tags = null;
            })
            .addCase(getTrainerAvailableDates.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTrainerAvailableDates.fulfilled, (state,action) => {
                state.isLoading = false;    
                state.availabeDates = action.payload.availabeDates;
            })
            .addCase(getTrainerAvailableDates.rejected, (state) => {
                state.isLoading = false;
                state.availabeDates = null;
            })
            .addCase(addAvailableDate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addAvailableDate.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addAvailableDate.rejected, (state, action) => {
                state.isLoading = false;
                throw Error(action.error.message);
            })
    }
})


export const {loading} = trainerSlice.actions;
export default trainerSlice.reducer;