import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

import styles from "./CommandPrompt.module.sass";
import Layout from "Components/Layout/Layout";
import Symbol from "Components/Symbol/Symbol";
import Overlay from "Components/Overlay/Overlay";
import CommandItem from "Components/CommandItem/CommandItem";
import { Command } from "Models/Command";
import { useCommands } from "Store/Hooks/useCommands";
import { useDispatch } from "react-redux";

function CommandPrompt() {
    const inputField = React.createRef<HTMLInputElement>();

    const dispatch = useDispatch();
    const commands = useCommands();

    const [shown, setShown] = useState<boolean>(false);
    const [typed, setTyped] = useState<string>("");
    const [selectedCommandIndex, setSelectedCommandIndex] =
        useState<number>(null);
    const [matchedCommands, setMatchedCommands] = useState<Command[]>(commands);
    const commandToRun = useRef<Command>(null);

    useEffect(() => {
        setMatchedCommands(
            commands.filter((command) => {
                const lowerCommand = command.name.toLowerCase();
                const lowerTyped = typed.toLowerCase();
                return lowerCommand.includes(lowerTyped);
            }),
        );
        setSelectedCommandIndex(matchedCommands.length >= 0 ? 0 : undefined);
    }, [typed, commands, dispatch]);

    useEffect(() => {
        if (shown) {
            inputField.current.focus();
            setSelectedCommandIndex(0);
        } else {
            inputField.current.blur();
            setTyped("");
            if (commandToRun.current) {
                commandToRun.current.callback();
                commandToRun.current = null;
            }
        }
    }, [shown]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDownInDocument);

        return () =>
            document.removeEventListener("keydown", handleKeyDownInDocument);
    }, [shown, selectedCommandIndex]);

    const handleKeyDownInDocument = (event) => {
        // TODO: Shortcut in a settings pane ?
        if ((event.ctrlKey || event.metaKey) && event.key == "k") {
            setShown(() => !shown);
            event.preventDefault();
        }

        if (shown && event.key == "Escape") {
            setShown(false);
            event.preventDefault();
        }

        // Selected item is cyclic
        switch (event.key) {
            case "ArrowUp":
                setSelectedCommandIndex(
                    (selectedCommandIndex - 1 + matchedCommands.length) %
                        matchedCommands.length,
                );
                event.preventDefault();
                break;
            case "ArrowDown":
                setSelectedCommandIndex(
                    (selectedCommandIndex + 1) % matchedCommands.length,
                );
                event.preventDefault();
                break;
        }
    };

    const handleValueChangeInInput = (event) => setTyped(event.target.value);

    const handleInputKeyDown = (event) => {
        if (event.key == "Enter") {
            runSelectedCommand(
                matchedCommands.length != 0 ? selectedCommandIndex : undefined,
            );
        }
    };

    const runSelectedCommand = (index?: number) => {
        if (index === undefined) return;

        commandToRun.current = matchedCommands[index];
        setShown(false);
    };

    const commandItems = matchedCommands.map((command, index) => {
        const clickCallback = () => {
            setSelectedCommandIndex(index);
            runSelectedCommand(index);
        };

        return (
            <CommandItem
                key={command.id}
                onClick={clickCallback}
                command={command}
                typed={typed}
                selected={selectedCommandIndex == index}
            />
        );
    });

    return (
        <React.Fragment>
            <Layout
                vertical
                className={classNames({
                    [styles.commandPrompt]: true,
                    [styles.shown]: shown,
                })}
            >
                <Layout left center className={styles.inputBar}>
                    <Symbol symbol="search" size={24} />
                    <input
                        className={styles.inputField}
                        placeholder="Type a command"
                        value={typed}
                        onChange={handleValueChangeInInput}
                        ref={inputField}
                        onKeyDown={handleInputKeyDown}
                    />
                </Layout>
                <ul className={styles.commandList}>{commandItems}</ul>
            </Layout>
            <Overlay show={shown} onClick={() => setShown(false)} />
        </React.Fragment>
    );
}

export default CommandPrompt;
