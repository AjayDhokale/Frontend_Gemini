const conf = {
    geminiApiKey : String(import.meta.env.VITE_GEMINI_API_KEY), 
    backendApIUrl : String(import.meta.env.VITE_BACKEND_API_URL), 
}

// console.log("Backend URL:", import.meta.env.VITE_BACKEND_API_URL);
// console.log("geminiApiKey:", conf.geminiApiKey);
// console.log("Backend URL:", conf.backendApIUrl);

export default conf