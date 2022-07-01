import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

import styles from "./CommandPrompt.module.sass";
import Layout from "Components/Layout/Layout";
import Symbol from "Components/Symbol/Symbol";
import { COMMAND_LIST } from "../../commands";
import { Command } from "Models/Command";
import Overlay from "Components/Overlay/Overlay";

function CommandPrompt() {
    const inputField = React.createRef<HTMLInputElement>();

    const [shown, setShown] = useState<boolean>(false);
    const [typed, setTyped] = useState("");
    const [selectedCommandIndex, setSelectedCommandIndex] = useState(null);
    const [matchedCommands, setMatchedCommands] = useState(COMMAND_LIST);
    const commandToRun = useRef<Command>(null);

    useEffect(() => {
        setMatchedCommands(
            COMMAND_LIST.filter((command) => {
                const lowerCommand = command.name.toLowerCase();
                const lowerTyped = typed.toLowerCase();
                return lowerCommand.includes(lowerTyped);
            }),
        );
        setSelectedCommandIndex(matchedCommands.length >= 0 ? 0 : -1);
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
        document.addEventListener("keydown", handleKeyDownInDocument, {
            capture: false,
        });

        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDownInDocument, {
                capture: false,
            });
        };
    }, [shown, selectedCommandIndex]);

    const handleKeyDownInDocument = (event) => {
        // TODO: Shortcut in a settings pane ?
        if (event.ctrlKey && event.key == "k") {
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
                matchedCommands.length != 0 ? selectedCommandIndex : null,
            );
        }
    };

    const runSelectedCommand = (index: number | null) => {
        if (index != null) {
            commandToRun.current = matchedCommands[index];
            setShown(false);
        }
    };

    const renderMatchedCommands = () => {
        let index = -1;
        return matchedCommands.map((command) => {
            const lowerCommand = command.name.toLowerCase();
            const lowerTyped = typed.toLowerCase();
            const matchedPartIndex = lowerCommand.indexOf(lowerTyped);

            const beforeMatchedPart = command.name.substring(
                0,
                matchedPartIndex,
            );
            const matchedPart = command.name.substring(
                matchedPartIndex,
                matchedPartIndex + typed.length,
            );
            const afterMatchedPart = command.name.substring(
                matchedPartIndex + typed.length,
            );

            index += 1;
            const commandIndex = index;

            const clickCallback = () => {
                setSelectedCommandIndex(commandIndex);
                runSelectedCommand(commandIndex);
            };

            return (
                <li
                    className={classNames({
                        [styles.commandElement]: true,
                        [styles.selectedCommand]:
                            commandIndex == selectedCommandIndex,
                    })}
                    key={command.id}
                    onClick={clickCallback}
                >
                    <Layout horizontal left center maximize>
                        <Symbol symbol={command.icon} size={24} />
                        <div className={styles.commandInfos}>
                            <span className={styles.commandName}>
                                <span>{beforeMatchedPart}</span>
                                <span className={styles.matchedCommandPart}>
                                    {matchedPart}
                                </span>
                                <span>{afterMatchedPart}</span>
                            </span>
                            <br />
                            <span className={styles.commandTooltip}>
                                {command.tooltip}
                            </span>
                        </div>
                    </Layout>
                </li>
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
                <Layout left center className={classNames(styles.inputBar)}>
                    <Symbol symbol="search" size={24} />
                    <input
                        className={classNames(styles.inputField)}
                        placeholder="Type a command"
                        value={typed}
                        onChange={handleValueChangeInInput}
                        ref={inputField}
                        onKeyDown={handleInputKeyDown}
                    />
                </Layout>
                <ul className={classNames(styles.commandList)}>
                    {renderMatchedCommands()}
                </ul>
            </div>
            <Overlay show={shown} onClick={() => setShown(false)} />
        </React.Fragment>
    );
}

export default CommandPrompt;
