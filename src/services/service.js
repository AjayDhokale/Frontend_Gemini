import { GoogleGenAI } from '@google/genai';
import axios from "axios";
import { marked } from "marked";
import conf from '../config/config';


let API_Key = conf.geminiApiKey

const ai = new GoogleGenAI({ apiKey: API_Key });

export const getGeminiResponse = async (question) => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: question,
    });
    const output = response.text;  
    const parsedResponse = await marked.parse(output)
    return parsedResponse;
}

export const createNewChatinDB = async (name) => {
    let token = localStorage.getItem('token');
    let user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) return false;

    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let data = {
        name,
        userId: user._id
    }

    try {
        const res = await axios.post(`/api/v1/chats/create-chat`, data, config);

        if (res.data.status == 'success') {
            return res.data.data;
        } else {
            return false;
        }
    } catch (err) {
        console.log('ERROR: ' + err.message)
        return false;
    }
}

export const renameChatinDB = async (id, name) => {
    let token = localStorage.getItem('token');
    let user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) return false;

    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    }

    let data = {
        id,
        name,
    }

    try {

        const res = await axios.put(`/api/v1/chats/rename-chat`, data, config)

        if (res.data.status == 'success') {
            return res.data.data;
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
}

export const createNewMessageinDB = async (text, chatId, isGeminiResponse) => {

  
    if (!chatId) {
        return false;
    }


    let token = localStorage.getItem('token');
    if (!token) return false;

    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let data = { text, chatId, isGeminiResponse }     

    try {
        const res = await axios.post(`/api/v1/messages/create-message`, data, config);

        if (res.data.status == 'success') {
            return res.data.data;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}

export const getChatOfUser = async (text, chatId, isGeminiResponse) => {

    let token = localStorage.getItem('token');
    if (!token) return false;

    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    try {
        const res = await axios.get(`/api/v1/chats/get-chats`, config);
        if (res.data.status == 'success') {
            return res.data.data;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}

export const getMessagesOfChat = async (chatId) => {

    let token = localStorage.getItem('token');


    if (!token) return [];

    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    try {
        const res = await axios.get(`/api/v1/messages/get-all-messages/${chatId}`, config);

        if (res.data.status == 'success') {
            return res.data.data;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}

export const deleteChatAndMessagesinDB = async (chatId) => {

    let token = localStorage.getItem('token');

    if (!token) return [];

    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    try {
        const res = await axios.delete(`/api/v1/chats/delete-chat/${chatId}`, config);

        if (res.data.status == 'success') {
            
            return res.data.data;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}