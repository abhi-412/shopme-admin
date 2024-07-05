import { createAction, createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import colorService from './colorService'

export const getColors = createAsyncThunk(
    "colors/get-all",
    async (ThunkAPI)=>{
        try{
           return await colorService.getColors();

        }catch(error){
            return ThunkAPI.rejectwithValue(error);
        }
    }
)

export const createColor = createAsyncThunk(
    "colors/create",
    async (colorData,ThunkAPI)=>{
        try{
           return await colorService.createColor(colorData);

        }catch(error){
            return ThunkAPI.rejectWithValue(error);
        }
    }
)

export const getColor = createAsyncThunk('colors/get-color',async(id,thunkAPI)=>{

    try{
        return await colorService.getColor(id);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const deleteColor = createAsyncThunk('colors/delete',async(id,thunkAPI)=>{

    try{
        return await colorService.deleteColor(id);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})


export const updateColor = createAsyncThunk('colors/edit-color',async(data,thunkAPI)=>{
    console.log(data);
    try{
        return await colorService.updateColor(data.id,data.values);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_All");


const initialState= {
    colors: [],
    colorName:"",
    updatedColor:{},
    deletedColor:{},
    isLoading:false,
    isError:false,
    isSuccess: false,
    message:"",
};
export const colorSlice = createSlice({
    name:"colors",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getColors.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getColors.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false;
            state.isSuccess=true;
            state.colors = action.payload;
        })
        .addCase(getColors.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false;
            state.isSuccess=false;
            state.message = action.error;
        })
        .addCase(createColor.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(createColor.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false;
            state.isSuccess=true;
            state.createdColor = action.payload;
        })
        .addCase(createColor.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false;
            state.isSuccess=false;
            state.message = action.error;
        }).addCase(getColor.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getColor.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false;
            state.isSuccess=true;
            state.colorName = action.payload.color;
        })
        .addCase(getColor.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false;
            state.isSuccess=false;
            state.message = action.error;
        }).addCase(updateColor.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(updateColor.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false;
            state.isSuccess=true;
            state.updatedColor = action.payload;
        })
        .addCase(updateColor.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false;
            state.isSuccess=false;
            state.message = action.error;
        }).addCase(deleteColor.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(deleteColor.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false;
            state.isSuccess=true;
            state.deletedColor = action.payload;
        })
        .addCase(deleteColor.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false;
            state.isSuccess=false;
            state.message = action.error;
        }).addCase(resetState,()=>initialState)
    }
})

export default colorSlice.reducer;