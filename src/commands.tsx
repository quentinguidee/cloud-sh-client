import { Command } from "Models/Command";

let actualCommandId = 0
const makeId = () => actualCommandId++

export const COMMAND_LIST: Command[] = [
    {
        icon: "chat",
        id: makeId(),
        callback: () => alert("Hello world"),
        name: "Say hello",
        tooltip: "Display a popup with an hello message",
    },
    {
        icon: "waving_hand",
        id: makeId(),
        callback: () => alert("Goodbye"),
        name: "Say goodbye",
        tooltip: "Display a popup with a goodbye message",
    }
]

// TODO: Write a test to ensure that all commands are trimmed
