import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import prodCatService from "./prodCatService";

export const getprodCategories = createAsyncThunk(
    "prodCategories/get-all",
    async(ThunkAPI)=>{
        try{
            return await prodCatService.getprodCategories()
        }catch(error){
            return ThunkAPI.rejectwithValue(error);
        }
    }
)

export const createProdCat = createAsyncThunk('prodCategories/create',async(categoryData,thunkAPI)=>{

    try{
        return await prodCatService.createProdCategory(categoryData)

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})


export const getProdCat = createAsyncThunk('prodCategories/get-prodCategory',async(id,thunkAPI)=>{

    try{
        return await prodCatService.getproductCategory(id);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const deleteProdCat = createAsyncThunk('prodCategories/delete',async(id,thunkAPI)=>{

    try{
        return await prodCatService.deleteproductCategory(id);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})


export const updateProdCat = createAsyncThunk('prodCategories/edit-prodCategory',async(data,thunkAPI)=>{
    console.log(data);
    try{
        return await prodCatService.updateproductCategory(data.id,data.values);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_All");



const initialState ={
    prodCategories: {},
    deletedProdCategory:{},
    updatedProdCategory:{},
    createdProdCategory:{},
    prodCatName:{},
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const prodCatSlice = createSlice({
    name:"prodCategories",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getprodCategories.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getprodCategories.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=true,
            state.prodCategories=action.payload;
        })
        .addCase(getprodCategories.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false,
            state.isSuccess=false,
            state.message=action.error;
        })
        .addCase(createProdCat.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createProdCat.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=true,
            state.createdProdCategory=action.payload;
        })
        .addCase(createProdCat.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false,
            state.isSuccess=false,
            state.message=action.error;
        }).addCase(getProdCat.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getProdCat.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=true,
            state.prodCatName=action.payload.title; 
        })
        .addCase(getProdCat.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false,
            state.isSuccess=false,
            state.message=action.error;
        }).addCase(updateProdCat.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateProdCat.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=true,
            state.updatedProdCategory=action.payload;
        })
        .addCase(updateProdCat.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false,
            state.isSuccess=false,
            state.message=action.error;
        }).addCase(deleteProdCat.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteProdCat.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=true,
            state.deletedProdCategory=action.payload;
        })
        .addCase(deleteProdCat.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false,
            state.isSuccess=false,
            state.message=action.error;
        }).
        addCase(resetState,()=>initialState)

    }
})

export default prodCatSlice.reducer;