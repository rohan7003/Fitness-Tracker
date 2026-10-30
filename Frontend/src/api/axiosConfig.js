import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://fitness-tracker-backend-69sh.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;