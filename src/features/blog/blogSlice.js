import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from './blogService'

export const getBlogs = createAsyncThunk(
    "blog/get-all",
    async(ThunkAPI)=>{
        try{
            const res =  await blogService.getBlogs()
            return res.blogs;
        }catch(error){
            return ThunkAPI.rejectwithValue(error);
        }
    }
)
export const deleteBlog = createAsyncThunk(
    "blog/delete",
    async(id,ThunkAPI)=>{
        try{
            const res = await blogService.deleteBlog(id);
            return res;
        }catch(error){
            return ThunkAPI.rejectWithValue(error);
        }
    }
)

export const createBlog = createAsyncThunk('blog/create-blog',async(formData,thunkAPI)=>{

    try{
        return await blogService.createBlog(formData);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})


export const getBlog = createAsyncThunk('blog/get-blog',async(id,thunkAPI)=>{

    try{
        return await blogService.getBlog(id);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const updateBlog = createAsyncThunk('blog/edit-blog',async(data,thunkAPI)=>{
    try{
        return await blogService.updateBlog(data.id,data.values);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_All");



const initialState = {
    blogs: [],
    deletedBlog:{},
    updatedBlog:{},
    createdBlog:{},
    blog:{},
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const blogSlice = createSlice({
    name:"blogs",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getBlogs.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getBlogs.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=true,
            state.blogs=action.payload;
        })
        .addCase(getBlogs.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false,
            state.isSuccess=false,
            state.message=action.error;
        }).addCase(deleteBlog.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteBlog.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=true,
            state.deletedBlog=action.payload;
        })
        .addCase(deleteBlog.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false,
            state.isSuccess=false,
            state.message=action.error;
        }).addCase(createBlog.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createBlog.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=true,
            state.createdBlog=action.payload;
        })
        .addCase(createBlog.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false,
            state.isSuccess=false,
            state.message=action.error;
        }).addCase(updateBlog.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateBlog.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=true,
            state.updatedBlog=action.payload;
        })
        .addCase(updateBlog.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false,
            state.isSuccess=false,
            state.message=action.error;
        }).addCase(getBlog.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getBlog.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false,
            state.isSuccess=true,
            state.blog=action.payload;
        })
        .addCase(getBlog.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false,
            state.isSuccess=false,
            state.message=action.error;
        }).addCase(resetState,()=>initialState)
    }
})
export default blogSlice.reducer;