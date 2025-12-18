import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')),
        token: localStorage.getItem('token') || '',
    },
    reducers: {
        setUserData: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        logOutUser: (state, action) => {
            state.user = null
            state.token = ''

            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }

    }
})

export const { setUserData, logOutUser } = authSlice.actions
export default authSlice.reducer
