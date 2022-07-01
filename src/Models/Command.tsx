export type CommandCallback<> = () => void;

export type Command = {
    icon?: string;
    id: number;
    name: string;
    tooltip: string;
    // TODO: Add a possible shortcut to commands
    callback: CommandCallback;
};