import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { couponService } from "./couponService";

export const createCoupon = createAsyncThunk(
    "coupon/create",
    async(data,ThunkAPI)=>{
        try{
            return await couponService.createCoupon(data);
        }catch(error){
                return ThunkAPI.rejectWithValue(error)
        }
    }
)


export const getCoupons = createAsyncThunk(
    "coupon/get-all",
    async (ThunkAPI)=>{
        try{
           return await couponService.getCoupons();
        }catch(error){
            return ThunkAPI.rejectwithValue(error);
        }
    }
)


export const deleteCoupon = createAsyncThunk(
    "coupon/delete",
    async (id,ThunkAPI)=>{
        try{
           return await couponService.deleteCoupon(id);
        }catch(error){
            return ThunkAPI.rejectWithValue(error);
        }
    }
)

export const getCoupon = createAsyncThunk('coupon/get-coupon',async(id,thunkAPI)=>{

    try{
        return await couponService.getCoupon(id);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})



export const updateCoupon = createAsyncThunk('coupons/edit',async(data,thunkAPI)=>{
    console.log(data);
    try{
        return await couponService.updateCoupon(data.id,data.values);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})


export const resetState = createAction("Reset_All");


const initialState = {
    createdCoupon:{},
    deletedCoupon:{},
    coupon:{},
    updatedCoupon:{},
    coupons:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const couponSlice = createSlice({
    name:"coupon",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createCoupon.pending,(state)=>{
            state.isLoading = true
        }).addCase(createCoupon.fulfilled,(state,action)=>{
            state.isError = false,
            state.isLoading = false,
            state.isSuccess = true,
            state.createdCoupon = action.payload
        }).addCase(createCoupon.rejected,(state,action)=>{
            state.isError = true,
            state.isLoading = false,
            state.isSuccess = false,
            state.message = action.error
        }).addCase(getCoupons.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getCoupons.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false;
            state.isSuccess=true;
            state.coupons = action.payload;
        })
        .addCase(getCoupons.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false;
            state.isSuccess=false;
            state.message = action.error;
        }).addCase(deleteCoupon.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(deleteCoupon.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false;
            state.isSuccess=true;
            state.deletedCoupon = action.payload;
        })
        .addCase(deleteCoupon.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false;
            state.isSuccess=false;
            state.message = action.error;
        }).addCase(getCoupon.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getCoupon.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false;
            state.isSuccess=true;
            state.coupon = action.payload;
        })
        .addCase(getCoupon.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false;
            state.isSuccess=false;
            state.message = action.error;
        }).addCase(updateCoupon.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(updateCoupon.fulfilled,(state,action)=>{
            state.isError=false,
            state.isLoading=false;
            state.isSuccess=true;
            state.updatedCoupon = action.payload;
        })
        .addCase(updateCoupon.rejected,(state,action)=>{
            state.isError=true,
            state.isLoading=false;
            state.isSuccess=false;
            state.message = action.error;
        }).addCase(resetState,()=>initialState)
    }

})

export default couponSlice.reducer;