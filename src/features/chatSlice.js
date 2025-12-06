import { createSlice, nanoid } from "@reduxjs/toolkit";

let initialState = {
    value: []
}

const chatsSlice = createSlice({
    name: 'Chat',
    initialState,
    reducers: {
        setChats: (state, action) => {
            const chats = [...action.payload]  ||  []
            state.value = chats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        },
        
        // createNewChats: (state, action) => {
        //     state.value.push(action.payload)
        // },

        createNewChats: (state, action) => {    // <-- FIX: correct reducer
            state.value.push(action.payload);
        },

        deleteChat: (state, action) => {
            state.value = state.value.filter(chat => chat._id !== action.payload)        // <-- FIX
        }
    }
})

export const { setChats, createNewChats, deleteChat } = chatsSlice.actions
export default chatsSlice.reducer