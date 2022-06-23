import axios from "axios";

// TODO: .env
const API_URL = "http://localhost:8080";

async function get(route: string) {
    try {
        const res = await axios.get(`${API_URL}${route}`);
        return [res, null];
    } catch (err) {
        return [null, err];
    }
}

export { get };
