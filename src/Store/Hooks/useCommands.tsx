import { useSelector } from "react-redux";
import { useMemo } from "react";
import { getCommands } from "Store/Slices/CommandsSlice";
import { Command } from "Models/Command";

export const useCommands = () => {
    const commands = useSelector(getCommands);
    return useMemo<Command[]>(() => commands, [commands]);
};
