import apiClient from "./apiClient";

export const messageService = {

    createNewMessageinDB: async (text, chatId, isGeminiResponse) => {
        let data = { text, chatId, isGeminiResponse }
        const res = await apiClient.post(`/messages/create-message`, data);
        return res.data
    },

    getMessagesOfChat: async (chatId) => {
        const res = await apiClient.get(`/messages/get-all-messages/${chatId}`);
        return res.data
    }

}