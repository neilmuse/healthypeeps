import API from "./api";

export const signup = async (formData) => {

    try {
        const response = await API.post("/api/signup", formData);
        response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
