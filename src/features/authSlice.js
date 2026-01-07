import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: JSON.parse(localStorage.getItem('user')) ,
    token: localStorage.getItem('token') || '',
}

// // ✅ SAFE localStorage reads
// const storedUser = localStorage.getItem("user");
// const storedToken = localStorage.getItem("token");
// const initialState = {
//     user: storedUser ? JSON.parse(storedUser) : null,
//     token: storedToken ? storedToken : null,
//     // isAuthenticated: !!storedToken,
// }

const authSlice = createSlice({
    name: 'auth',
    initialState,
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
