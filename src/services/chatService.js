import apiClient from "./apiClient";

export const chatService = {
    createNewChatinDB: async (name) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return false;
        let data = {
            name,
            userId: user._id
        }
        const res = await apiClient.post('/chats/create-chat', data)
        return res.data
    },

    renameChatinDB: async (id, name) => {
        let user = JSON.parse(localStorage.getItem('user'));
        if (!user) return false;
        let data = {
            id,
            name,
        }
        const res = await apiClient.put(`/chats/rename-chat`, data)
        return res.data
    },

    getChatOfUser: async (text, chatId, isGeminiResponse) => {
        const res = await apiClient.get(`/chats/get-chats`);
        return res.data
    },

    deleteChatAndMessagesinDB: async (chatId) => {
        const res = await apiClient.delete(`/chats/delete-chat/${chatId}`);
        return res.data
    }
}
