import { createSlice, nanoid } from "@reduxjs/toolkit";

const messageSlice = createSlice({
        name: 'message',
        initialState: {
                value: []
        },
        reducers: {
                addMessage: (state, action) => {
                        state.value.push(action.payload)
                },
                setMessages: (state, action) => {
                        state.value = [ ...action.payload]
                }
        }
})

export const { addMessage, setMessages } = messageSlice.actions
export default messageSlice.reducer
