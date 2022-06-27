import { useSelector } from "react-redux";
import { useMemo } from "react";
import { getMessages } from "Store/Slices/MessagesSlice";
import { Message } from "Models/Message";

export const useMessages = () => {
    const messages = useSelector(getMessages);
    return useMemo<Message[]>(() => messages, [messages]);
};
