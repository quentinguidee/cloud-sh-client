import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreState } from "Store/Store";
import { Command } from "Models/Command";

function pushCommandReducer(state, action: PayloadAction<Command>) {
    const { payload: command } = action;
    state.push(command);
}

function removeCommandReducer(state, action: PayloadAction<Command>) {
    const { payload: command } = action;
    return state.filter((el) => el.id !== command.id);
}

const commandsSlice = createSlice({
    name: "commands",
    initialState: [] as Command[],
    reducers: {
        pushCommand: pushCommandReducer,
        removeCommand: removeCommandReducer,
    },
});

export const { pushCommand, removeCommand } = commandsSlice.actions;

export const getCommands = (state: StoreState) => state.commands;

export default commandsSlice.reducer;
