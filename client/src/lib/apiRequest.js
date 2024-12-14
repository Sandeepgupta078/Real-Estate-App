import axios from "axios";

const apiRequest = axios.create({
    baseURL: "http://localhost:8800/api", // URL of the API
    withCredentials: true, // Send cookies when making a request
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiRequest;

  