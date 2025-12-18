import { createSlice, nanoid } from "@reduxjs/toolkit";

let initialState = {
    value: []
}

const chatsSlice = createSlice({
    name: 'Chat',
    initialState,
    reducers: {

        setChats: (state, action) => {
            const chats = Array.isArray(action.payload) ? action.payload : []
            state.value = chats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        },

        createNewChats: (state, action) => {
            state.value.push(action.payload);
        },

        renameChats: (state, action) => {
            const updatedChat = action.payload
            state.value = state.value.map(chat => (
                chat._id == updatedChat._id ? updatedChat : chat
            ))
        },

        deleteChat: (state, action) => {
            state.value = state.value.filter(chat => chat._id !== action.payload)
        }
    }
})

export const { setChats, createNewChats, renameChats, deleteChat } = chatsSlice.actions
export default chatsSlice.reducer