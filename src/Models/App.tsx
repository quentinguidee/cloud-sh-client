export type AppPosition = "normal" | "settings";

export type App = {
    id: string;
    name: string;
    symbol: string;
    position?: AppPosition;
};
