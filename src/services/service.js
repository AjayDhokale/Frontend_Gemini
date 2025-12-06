import { GoogleGenAI } from '@google/genai';
import axios from "axios";
import { marked } from "marked";
import conf from '../config/config';

// const API_Key = 'AIzaSyD_qLfv8Uyfep3VThmkj6r_lBH42F_wpGU'
let API_Key = conf.geminiApiKey
// console.log("Check key:", API_Key);

const ai = new GoogleGenAI({ apiKey: API_Key });

export const getGeminiResponse = async (question) => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: question,
    });
    console.log("getGeminiResponse:  response ----->", response);
    const output = response.text;  // <-- FIX: updated for new API
    console.log("getGeminiResponse:  response ----->", response.text);
    const parsedResponse = await marked.parse(output)
    console.log("getGeminiResponse:  parsedResponse ----->", parsedResponse);
    return parsedResponse;
    // return output
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
        const res = await axios.post(`${conf.backendApIUrl}/api/v1/chats/create-chat`, data, config);

        if (res.data.status == 'success') {
            return res.data.data;
        } else {
            // console.log(res.data.message)
            return false;
        }
    } catch (err) {
        console.log('ERROR: ' + err.message)
        return false;
    }
}

export const createNewMessageinDB = async (text, chatId, isGeminiResponse) => {

    // console.log("createNewMessageinDB:  Text ----->", text);
    // console.log("createNewMessageinDB:  chatId ----->", chatId);
    // console.log("createNewMessageinDB:  isGeminiResponse ----->", isGeminiResponse);

    if (!chatId) {
        console.log("ERROR: chatId missing");
        return false;
    }


    let token = localStorage.getItem('token');
    if (!token) return false;

    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let data = { text, chatId, isGeminiResponse }        // <-- FIX

    try {
        const res = await axios.post(`${conf.backendApIUrl}/api/v1/messages/create-message`, data, config);

        if (res.data.status == 'success') {
            return res.data.data;
        } else {
            // console.log(res.data.message)
            return false;
        }
    } catch (err) {
        console.log('ERROR: ' + err.message)
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
        const res = await axios.get(`${conf.backendApIUrl}/api/v1/chats/get-chats`, config);
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

export const getMessagesOfChat = async (chatId) => {

    let token = localStorage.getItem('token');

    // OLD
    // if (!token) return false;

    // New
    if (!token) return [];

    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    try {
        const res = await axios.get(`${conf.backendApIUrl}/api/v1/messages/get-all-messages/${chatId}`, config);

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