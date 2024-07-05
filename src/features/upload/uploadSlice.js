import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const uploadImg = createAsyncThunk(
    'upload/image',
    async(data,ThunkAPI)=>{
        try{
            const formdata = new FormData();
            for(let i=0;i<data.length;i++){
                formdata.append("images",data[i])
            }
            console.log(formdata);
            return await uploadService.upload(formdata);
        }catch(error){
            return ThunkAPI.rejectWithValue(error)
        }
    }
)


export const deleteImg = createAsyncThunk(
    'upload/del-img',
    async(id,ThunkAPI)=>{
        try{
            const data =  await uploadService.deleteImg(id);
            console.log(data);
        }catch(error){
            return ThunkAPI.rejectWithValue(error.response.data)
        }
    }
)


const initialState = {
    images:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const uploadSlice = createSlice({
    name:"images",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(uploadImg.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(uploadImg.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=true,
            state.images = action.payload;
        })
        .addCase(uploadImg.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false,
            state.isSuccess=false,
            state.message = action.message;
        })
        .addCase(deleteImg.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(deleteImg.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=true,
            state.images = action.payload;
        })
        .addCase(deleteImg.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false,
            state.isSuccess=false,
            state.message = action.payload;
        })
    }
})

export default uploadSlice.reducer;