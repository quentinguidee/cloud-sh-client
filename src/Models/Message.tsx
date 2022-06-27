export type MessageType = "normal" | "info" | "warning" | "error";

export type Message = {
    type: MessageType;
    message: string;
};
