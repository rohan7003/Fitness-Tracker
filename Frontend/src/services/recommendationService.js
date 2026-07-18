import axiosInstance from "../api/axiosConfig";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

const generateRecommendation = async (activityId) => {
    const response = await axiosInstance.post(
        `/recommendation/generate/${activityId}`,
        {},
        getAuthHeader()
    );

    return response.data;
};

const getRecommendationsByUser = async (userId) => {

    const response = await axiosInstance.get(
        `/recommendation/user/${userId}`,
        getAuthHeader()
    );

    return response.data;
};

const recommendationService = {
    generateRecommendation,
    getRecommendationsByUser,
};

export default recommendationService;