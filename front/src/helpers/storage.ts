const TOKEN_KEY = 'accessToken';


export const setToken = (token: string) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    console.error('Token cannot be null or undefined');
  }
};

export const getToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};