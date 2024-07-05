import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blCatService from "./blCatService";

export const getblCategories = createAsyncThunk(
    "blogCategories/get-all",
    async(ThunkAPI)=>{
        try{
            return await blCatService.getblCategories()
        }catch(error){
            return ThunkAPI.rejectwithValue(error);
        }
    }
)


export const createBlogCat = createAsyncThunk('blogCategories/create',async(categoryData,thunkAPI)=>{

    try{
        return await blCatService.createBlCategory(categoryData)

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})


export const getBlogCat = createAsyncThunk('blogCategories/get-category',async(id,thunkAPI)=>{

    try{
        return await blCatService.getBlogCategory(id);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const deleteBlogCat = createAsyncThunk('blogCategories/delete',async(id,thunkAPI)=>{

    try{
        return await blCatService.deleteBlogCategory(id);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})


export const updateBlogCat = createAsyncThunk('blogCategories/edit-category',async(data,thunkAPI)=>{
    console.log(data);
    try{
        return await blCatService.updateBlogCategory(data.id,data.values);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_All");



const initialState ={
    blCategories: [],
    createdBlogCat:{},
    deletedBlogCat:{},
    blogCatName:"",
    updatedBlogCat:{},
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"", 
}

export const blCatSlice = createSlice({
    name:"blCategories",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getblCategories.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getblCategories.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=true,
            state.blCategories=action.payload;
        })
        .addCase(getblCategories.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false,
            state.isSuccess=false,
            state.message=action.error;
        }).addCase(createBlogCat.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createBlogCat.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=true,
            state.createdBlogCat=action.payload;
        })
        .addCase(createBlogCat.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false,
            state.isSuccess=false,
            state.message=action.error;
        }).addCase(updateBlogCat.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateBlogCat.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=true,
            state.updatedBlogCat=action.payload;
        })
        .addCase(updateBlogCat.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false,
            state.isSuccess=false,
            state.message=action.error;
        }).addCase(getBlogCat.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getBlogCat.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=true,
            state.blogCatName=action.payload.title;
        })
        .addCase(getBlogCat.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false,
            state.isSuccess=false,
            state.message=action.error;
        }).addCase(deleteBlogCat.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteBlogCat.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=true,
            state.blogCatName=action.payload.title;
        })
        .addCase(deleteBlogCat.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false,
            state.isSuccess=false,
            state.message=action.error;
        }).addCase(resetState,()=>initialState)
    }
})

export default blCatSlice.reducer;