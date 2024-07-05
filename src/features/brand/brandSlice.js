import brandService from "./brandService";
import { createAction, createAsyncThunk , createSlice } from "@reduxjs/toolkit";


export const getBrands = createAsyncThunk(
    'brands/all-brands',
    async(ThunkAPI)=>{
        try{
            return await brandService.getBrands();
        }catch(error){
            return ThunkAPI.rejectwithValue(error);
        }
    }
)

export const createBrand = createAsyncThunk('brands/create-brand',async(brandData,thunkAPI)=>{

    try{
        return await brandService.createBrand(brandData);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})


export const getBrand = createAsyncThunk('brands/get-brand',async(id,thunkAPI)=>{

    try{
        return await brandService.getBrand(id);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const deleteBrand = createAsyncThunk('brands/delete',async(id,thunkAPI)=>{

    try{
        return await brandService.deleteBrand(id);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})


export const updateBrand = createAsyncThunk('brands/edit-brand',async(data,thunkAPI)=>{
    try{
        return await brandService.updateBrand(data.id,data.values);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_All");


const initialState ={
    brands: [],
    brandName:"",
    updatedBrand:{},
    deletedBrand:{},
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const brandSlice = createSlice({
    name:"brands",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getBrands.pending, (state)=>{
            state.isLoading=true;
            state.isSuccess=false;
            state.isError=false;
        })
        .addCase(getBrands.fulfilled, (state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.brands=action.payload;
        })
        .addCase(getBrands.rejected, (state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message = action.error;
        })
        .addCase(createBrand.pending, (state)=>{
            state.isLoading=true;
            state.isSuccess=false;
            state.isError=false;
        })
        .addCase(createBrand.fulfilled, (state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.createdBrand=action.payload;
        })
        .addCase(createBrand.rejected, (state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message = action.error;
        })
        .addCase(getBrand.pending, (state)=>{
            state.isLoading=true;
            state.isSuccess=false;
            state.isError=false;
        })
        .addCase(getBrand.fulfilled, (state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.brandName=action.payload.title;
        })
        .addCase(getBrand.rejected, (state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message = action.error;
        }).addCase(updateBrand.pending, (state)=>{
            state.isLoading=true;
            state.isSuccess=false;
            state.isError=false;
        })
        .addCase(updateBrand.fulfilled, (state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.updatedBrand=action.payload.title;
        })
        .addCase(updateBrand.rejected, (state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message = action.error;
        }).addCase(deleteBrand.pending, (state)=>{
            state.isLoading=true;
            state.isSuccess=false;
            state.isError=false;
        })
        .addCase(deleteBrand.fulfilled, (state,action)=>{
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=true;
            state.deletedBrand=action.payload;
        })
        .addCase(deleteBrand.rejected, (state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.message = action.error;
        }).
        addCase(resetState,()=>initialState)
    },
})

export default brandSlice.reducer;