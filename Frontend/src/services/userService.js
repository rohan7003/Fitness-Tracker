import axiosInstance from "../api/axiosConfig";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

const getProfile = async (userId) => {
    const response = await axiosInstance.get(
        `/user/profile/${userId}`,
        getAuthHeader()
    );

    return response.data;
};

const userService = {
    getProfile,
};

export default userService;