import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreState } from "Store/Store";
import { Message } from "Models/Message";

function pushMessageReducer(state, action: PayloadAction<Message>) {
    const { payload: message } = action;
    state.push(message);
}

function removeMessageReducer(state, action: PayloadAction<Message>) {
    const { payload: message } = action;
    state.splice(message, 1);
}

const messagesSlice = createSlice({
    name: "messages",
    initialState: [] as Message[],
    reducers: {
        pushMessage: pushMessageReducer,
        removeMessage: removeMessageReducer,
    },
});

export const { pushMessage, removeMessage } = messagesSlice.actions;

export const getMessages = (state: StoreState) => state.messages;

export default messagesSlice.reducer;
