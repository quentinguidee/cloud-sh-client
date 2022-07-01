import { Message } from "Models/Message";
import store from "Store/Store";
import { pushMessage } from "Store/Slices/MessagesSlice";

const API_URL = process.env.API_URL;

export const route = (route: string) => `${API_URL}${route}`;

export const api = {
    error: (err) => {
        console.error(err);

        const content =
            err?.response?.data?.message ?? err.message ?? err.toString();

        const message: Message = {
            type: "error",
            message: content,
        };

        store.dispatch(pushMessage(message));
    },

    createBlobURL: (res) => {
        const blob = new Blob([res.data]);
        return window.URL.createObjectURL(blob);
    },

    download: (res, filename: string) => {
        const raw = api.createBlobURL(res);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = raw;
        a.download = filename;
        a.click();
    },
};
