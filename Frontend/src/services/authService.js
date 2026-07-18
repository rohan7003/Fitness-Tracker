import axiosInstance from "../api/axiosConfig";

const register = async (userData) => {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
};

const login = async (loginData) => {
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data;
};

const authService = {
    register,
    login,
};

export default authService;