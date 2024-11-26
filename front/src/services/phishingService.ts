import Axios from "@/lib/axiosInstance";

export interface Phishing {
    _id: string,
    email: string,
    content: string,
    status: string,
    createdBy: string,
    createdAt: Date,
    updatedAt: Date,
}

interface sendEmailProps {
    email: string
}

export const getPhishings = async (): Promise<Phishing[] | null> => {
    try {
        const response = await Axios.get<Phishing[]>(`/phishing`);
        return response.data;
    } catch (error) {
        console.log(error)
        console.error("Login Error:", error);
        return null;
    };
}

export const sendPhishingEmail = async ({ email }: sendEmailProps): Promise<any[] | null> => {
    try {
        const response = await Axios.post<Phishing[]>(`/phishing`, { email });
        return response.data;
    } catch (error) {
        console.error("Login Error:", error);
        return null;
    };
}
