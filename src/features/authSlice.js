import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) ,
    token: localStorage.getItem('token') || '',
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        logOutUser: (state) => {
            state.user = null
            state.token = ''

            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }

    }
})

export const { setUserData, logOutUser } = authSlice.actions
export default authSlice.reducer
