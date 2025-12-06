import { configureStore } from '@reduxjs/toolkit'
import MessageReducers from '../features/messagesSlice.js'
import ChatReducers from '../features/chatSlice.js'
import AuthReducers from '../features/authSlice.js'


export const store = configureStore({
        reducer: {
                messages: MessageReducers,
                chats: ChatReducers,
                auth: AuthReducers
        }
})