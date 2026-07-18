import axiosInstance from "../api/axiosConfig";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

const createActivity = async (activityData) => {
    const response = await axiosInstance.post(
        "/activity",
        activityData,
        getAuthHeader()
    );

    return response.data;
};

const getActivitiesByUser = async (userId) => {
    const response = await axiosInstance.get(
        `/activity/user/${userId}`,
        getAuthHeader()
    );

    return response.data;
};

const deleteActivity = async (activityId) => {
    const response = await axiosInstance.delete(
        `/activity/${activityId}`,
        getAuthHeader()
    );

    return response.data;
};

const activityService = {
    createActivity,
    getActivitiesByUser,
    deleteActivity,
};

export default activityService;