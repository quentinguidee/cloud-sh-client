import classNames from "classnames";
import React from "react";

import styles from "./CommandPrompt.module.sass";
import Layout from "Components/Layout/Layout";
import Symbol from "Components/Icon/Symbol";
import { COMMAND_LIST } from "../../commands";
import { Command } from "Models/Command";

type Props = React.HTMLProps<HTMLDivElement>;

type State = {
    shown: boolean
    typed: string;
    selectedCommandIndex?: number;
    matchedCommands: Command[];
}

class CommandPrompt extends React.Component<Props, State> {
    private readonly inputField: React.RefObject<HTMLInputElement>;
    private readonly promptContainer: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props);

        this.state = {
            shown: false,
            typed: "",
            selectedCommandIndex: null,
            matchedCommands: COMMAND_LIST
        }

        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleClickOnOverlay = this.handleClickOnOverlay.bind(this)
        this.handleInputKeyPress = this.handleInputKeyPress.bind(this)

        document.addEventListener("keydown", (e) => {
            // TODO: Shortcut in a settings pane
            if (e.ctrlKey && e.key == 'k') {
                this.setState({
                    shown: !this.state.shown
                })

                e.preventDefault();
            }

        })

        this.inputField = React.createRef();
        this.promptContainer = React.createRef();
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if (prevState.shown != this.state.shown) {
            if (this.state.shown) {
                this.inputField.current.focus()
                this.setState({
                    selectedCommandIndex: 0
                })
            } else {
                this.inputField.current.blur()
                this.setState({
                    typed: ""
                })
            }
        }
    }

    handleTypedValueChange = (e) => this.setState({
        typed: e.target.value,
        matchedCommands: COMMAND_LIST.filter((command) => {
            const lowerCommand = command.name.toLowerCase()
            const lowerTyped = e.target.value.toLowerCase()
            return lowerCommand.includes(lowerTyped)
        })
    })

    handleClickOnOverlay(event) {
        if (!this.promptContainer.current.contains(event.target)) {
            this.setState({
                shown: false
            })
        }
    }

    handleKeyDown(event) {
        // Selected item is cyclic
        switch (event.key) {
            case "ArrowUp":
                this.setState({
                    selectedCommandIndex: (this.state.selectedCommandIndex + 1) % this.matchedCommands().length
                })
                break
            case "ArrowDown":
                this.setState({
                    selectedCommandIndex: (this.state.selectedCommandIndex - 1 + this.matchedCommands().length) % this.matchedCommands().length
                })
        }
    }

    handleInputKeyPress(event) {
        if (event.key == "Enter") {
            const commandToRun = this.state.matchedCommands[this.state.selectedCommandIndex]
            this.setState({
                shown: false
            }, commandToRun.callback)
        }
    }

    matchedCommands() {
        let index = -1
        return (
            this.state.matchedCommands.map((command) => {
                const lowerCommand = command.name.toLowerCase()
                const lowerTyped = this.state.typed.toLowerCase()
                const matchedPartIndex = lowerCommand.indexOf(lowerTyped)

                const beforeMatchedPart = command.name.substring(0, matchedPartIndex )
                const matchedPart = command.name.substring(matchedPartIndex, matchedPartIndex + this.state.typed.length)
                const afterMatchedPart = command.name.substring(matchedPartIndex + this.state.typed.length)

                index += 1

                const onClick = () => {
                    this.setState({
                        shown: false
                    }, command.callback)
                }

                return (
                    <li
                        className={classNames({
                        [styles.matchedCommand]: true,
                        [styles.selectedCommand]: index == this.state.selectedCommandIndex
                        })}
                        key={command.id}
                        onClick={onClick}
                    >
                        <Layout horizontal left center>
                            <Symbol symbol={command.icon} size={24} />
                            <span className={classNames(styles.commandName)}>
                                <span className={classNames(styles.matchedCommandFirstPart)}>
                                    { beforeMatchedPart }
                                </span>
                                <span className={classNames(styles.matchedCommandPart)}>
                                    { matchedPart }
                                </span>
                                <span>
                                    { afterMatchedPart }
                                </span>
                            </span>
                        </Layout>
                    </li>
                )
            })
        )
    }

    render() {
        return (
            <div
                className={classNames({
                    [styles.overlay]:true,
                    [styles.shown]: this.state.shown}
                )}
                onClick={this.handleClickOnOverlay}
            >
                <Layout center justify maximize>
                    <div
                        className={classNames(styles.commandPrompt)}
                        onKeyDown={this.handleKeyDown}
                        ref={this.promptContainer}
                    >
                        <Layout left center className={classNames(styles.inputBar)}>
                            <Symbol symbol="search" size={24} />
                            <input
                                className={classNames(styles.inputField)}
                                placeholder="Mon document.txt"
                                value={this.state.typed}
                                onChange={this.handleTypedValueChange}
                                ref={this.inputField}
                                onKeyPress={this.handleInputKeyPress}
                            />
                        </Layout>
                        <ul className={classNames(styles.commandList)}>
                            { this.matchedCommands() }
                        </ul>
                    </div>
                </Layout>
            </div>
        );
    }
}

export default CommandPrompt;
