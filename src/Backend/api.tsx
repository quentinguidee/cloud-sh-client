import axios from "axios";

// TODO: .env
const API_URL = "http://localhost:8080";

export async function get(route: string) {
    try {
        const res = await axios.get(`${API_URL}${route}`);
        return [res, null];
    } catch (err) {
        return [null, err];
    }
}

export async function post(route: string, data: object) {
    try {
        const res = await axios.post(`${API_URL}${route}`, data);
        return [res, null];
    } catch (err) {
        return [null, err];
    }
}
