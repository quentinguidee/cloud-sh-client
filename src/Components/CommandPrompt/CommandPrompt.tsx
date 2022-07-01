import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

import styles from "./CommandPrompt.module.sass";
import Layout from "Components/Layout/Layout";
import Symbol from "Components/Symbol/Symbol";
import Overlay from "Components/Overlay/Overlay";
import CommandItem from "Components/CommandItem/CommandItem";
import { COMMAND_LIST } from "../../commands";
import { Command } from "Models/Command";

function CommandPrompt() {
    const inputField = React.createRef<HTMLInputElement>();

    const [shown, setShown] = useState<boolean>(false);
    const [typed, setTyped] = useState<string>("");
    const [selectedCommandIndex, setSelectedCommandIndex] =
        useState<number>(null);
    const [matchedCommands, setMatchedCommands] =
        useState<Command[]>(COMMAND_LIST);
    const commandToRun = useRef<Command>(null);

    useEffect(() => {
        setMatchedCommands(
            COMMAND_LIST.filter((command) => {
                const lowerCommand = command.name.toLowerCase();
                const lowerTyped = typed.toLowerCase();
                return lowerCommand.includes(lowerTyped);
            }),
        );
        setSelectedCommandIndex(matchedCommands.length >= 0 ? 0 : undefined);
    }, [typed]);

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
                    (selectedCommandIndex + 1) % matchedCommands.length,
                );
                event.preventDefault();
                break;
            case "ArrowDown":
                setSelectedCommandIndex(
                    (selectedCommandIndex - 1 + matchedCommands.length) %
                        matchedCommands.length,
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

    const renderMatchedCommands = () => {
        return matchedCommands.map((command, index) => {
            const commandIndex = index;

            const clickCallback = () => {
                setSelectedCommandIndex(commandIndex);
                runSelectedCommand(commandIndex);
            };

            return (
                <CommandItem
                    onClick={clickCallback}
                    command={command}
                    typed={typed}
                    selected={selectedCommandIndex == commandIndex}
                />
            );
        });
    };

    return (
        <React.Fragment>
            <div
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
                <ul className={styles.commandList}>
                    {renderMatchedCommands()}
                </ul>
            </div>
            <Overlay show={shown} onClick={() => setShown(false)} />
        </React.Fragment>
    );
}

export default CommandPrompt;
