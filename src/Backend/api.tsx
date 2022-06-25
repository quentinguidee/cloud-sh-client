import axios, { AxiosResponse } from "axios";

// TODO: .env
const API_URL = "http://localhost:8080";

export async function get(route: string): Promise<AxiosResponse<any>> {
    return axios.get(`${API_URL}${route}`);
}

export async function post(
    route: string,
    data: object,
): Promise<AxiosResponse<any>> {
    return axios.post(`${API_URL}${route}`, data);
}
