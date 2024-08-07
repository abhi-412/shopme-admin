import { createAction, createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import productService from "./productService";


export const getProducts = createAsyncThunk('product/get-products',async(thunkAPI)=>{

    try{
        return await productService.getProducts();

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const createProducts = createAsyncThunk('product/create-products',async(productData,thunkAPI)=>{
    console.log(productData)
    try{
        return await productService.createProduct(productData);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const deleteProduct = createAsyncThunk(
    "product/delete",
    async(id,ThunkAPI)=>{
        try{
            const res = await productService.deleteProduct(id);
            return res;
        }catch(error){
            return ThunkAPI.rejectWithValue(error);
        }
    }
)

export const getProductById = createAsyncThunk('product/get-product',async(id,thunkAPI)=>{
    try{
        return await productService.getOneProduct(id);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }

})

export const resetState = createAction("Reset_All");

const initialState = {
    products: [],
    deletedProduct:{},
    product:{},
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getProducts.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.products = action.payload;
        })
        .addCase(getProducts.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(createProducts.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createProducts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdProduct = action.payload;
        })
        .addCase(createProducts.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteProduct.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedProduct = action.payload;
        })
        .addCase(deleteProduct.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(resetState,()=>initialState).addCase(getProductById.pending,(state)=>{
            state.isLoading = true,
            state.isError = false,
            state.isSuccess = false

        }).addCase(getProductById.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
        }).addCase(getProductById.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload || "Error getting Product";
        })
    },
})

export default productSlice.reducer;

