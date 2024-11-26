import Axios from "@/lib/axiosInstance"

interface LoginParams {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        _id: string;
        password: string;
        email: string;
        createdAt: string,
        updatedAt: string
    };
}

export const login = async ({ email, password }: LoginParams): Promise<LoginResponse | null> => {
    try {
        const response = await Axios.post<LoginResponse>(`/user/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error("Login Error:", error);
        return null;
    };
}

export const register = async ({ email, password }: LoginParams): Promise<LoginResponse | null> => {
    try {
        const response = await Axios.post<LoginResponse>(`/user/register`, { email, password });
        return response.data;
    } catch (error) {
        console.error("Login Error:", error);
        return null;
    };
}