const API_URL = process.env.API_URL;

export const route = (route: string) => `${API_URL}${route}`;
