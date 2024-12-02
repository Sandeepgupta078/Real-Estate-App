import axios from "axios";

const apiRequest = axios.create({
    baseURL: "http://localhost:8800/api", // URL of the API
    withCredentials: true, // Send cookies when making a request
});

export default apiRequest;