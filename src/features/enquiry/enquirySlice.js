import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";

export const getEnquiry = createAsyncThunk(
    'enquiry/get-all',
    async(ThunkAPI)=>{
        try{
            return await enquiryService.getEnquiries();
        }catch(error){
            return ThunkAPI.rejectWithValue(error)
        }
    }
)

export const getOneEnquiry = createAsyncThunk('enquiry/get-enquiry',async(id,thunkAPI)=>{

    try{
        return await enquiryService.getEnquiry(id);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const deleteEnquiry = createAsyncThunk('enquiry/delete',async(id,thunkAPI)=>{

    try{
        return await enquiryService.deleteEnquiry(id);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})


export const updateEnquiry = createAsyncThunk('enquiry/edit-enquiry',async(data,thunkAPI)=>{
    try{
        return await enquiryService.updateEnquiry(data.id,data.values);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_All");

const initialState = {
    enquiries:[],
    updatedEnquiry:{},
    deletedEnquiry:{},
    enquiry:{},
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const enquirySlice = createSlice({
    name:"enquiries",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getEnquiry.pending,(state)=>{
            state.isLoading=true;
            state.isSuccess=false;
            state.isError=false;
        })
        .addCase(getEnquiry.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=true,
            state.enquiries = action.payload;
        })
        .addCase(getEnquiry.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false,
            state.isSuccess=false,
            state.message = action.message;
        }).addCase(deleteEnquiry.pending,(state)=>{
            state.isLoading=true;
            state.isSuccess=false;
            state.isError=false;
        })
        .addCase(deleteEnquiry.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=true,
            state.deletedEnquiry = action.payload;
        })
        .addCase(deleteEnquiry.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false,
            state.isSuccess=false,
            state.message = action.message;
        }).addCase(updateEnquiry.pending,(state)=>{
            state.isLoading=true;
            state.isSuccess=false;
            state.isError=false;
        })
        .addCase(updateEnquiry.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=true,
            state.updatedEnquiry = action.payload;
        })
        .addCase(updateEnquiry.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false,
            state.isSuccess=false,
            state.message = action.message;
        }).addCase(getOneEnquiry.pending,(state)=>{
            state.isLoading=true;
            state.isSuccess=false;
            state.isError=false;
        })
        .addCase(getOneEnquiry.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=true,
            state.enquiry = action.payload;
        })
        .addCase(getOneEnquiry.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false,
            state.isSuccess=false,
            state.message = action.message;
        }).
        addCase(resetState,()=>initialState)
    }
})

export default enquirySlice.reducer;