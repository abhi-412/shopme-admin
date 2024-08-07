import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import {toast} from 'react-toastify'

const getUserfromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const initialState={
    user: getUserfromLocalStorage,
    orders:[],
    userOrder:{},
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
};

export const login = createAsyncThunk('auth/admin-login',async(user,thunkAPI)=>{

    try{
        return await authService.login(user);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})


export const getOrders = createAsyncThunk('order/get-orders',async(thunkAPI)=>{
    
    try{
        return await authService.getOrders();

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const getOrdersByUserId = createAsyncThunk('order/get-userOrders',async(id,thunkAPI)=>{
    
    try{
        return await authService.getOrdersByUserId(id);

    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const updateOrderStatus = createAsyncThunk('order/update-status',async(data,thunkAPI)=>{
    try{
            return await authService.updateOrderStatus(data);
    }catch(error){
        return thunkAPI.rejectWithValue()
    }
})



export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(login.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })

        .addCase(login.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.user = null;
            state.message = action.error;
        })
        .addCase(getOrders.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getOrders.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.orders = action.payload;
        })
        .addCase(getOrders.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(getOrdersByUserId.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getOrdersByUserId.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.userOrder = action.payload;
        })
        .addCase(getOrdersByUserId.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(updateOrderStatus.pending,(state)=>{
            state.isLoading = true
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(updateOrderStatus.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = "Order Status Updated Successfully"
            if(state.isSuccess){
                toast.success(state.message, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
        })
        .addCase(updateOrderStatus.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    },
})

export default authSlice.reducer;