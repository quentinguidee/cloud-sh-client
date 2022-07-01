import classNames from "classnames";
import styles from "Components/CommandItem/CommandItem.module.sass";
import Layout from "Components/Layout/Layout";
import Symbol from "Components/Symbol/Symbol";
import React from "react";
import { Command } from "Models/Command";

type Props = {
    onClick: () => void;
    selected: boolean;
    typed: string;
    command: Command;
};

function CommandItem(props: Props) {
    const { onClick, selected, typed, command } = props;

    const lowerCommand = command.name.toLowerCase();
    const lowerTyped = typed.toLowerCase();
    const matchedPartIndex = lowerCommand.indexOf(lowerTyped);

    const beforeMatchedPart = command.name.substring(0, matchedPartIndex);
    const matchedPart = command.name.substring(
        matchedPartIndex,
        matchedPartIndex + typed.length,
    );
    const afterMatchedPart = command.name.substring(
        matchedPartIndex + typed.length,
    );

    return (
        <li
            className={classNames({
                [styles.commandElement]: true,
                [styles.selectedCommand]: selected,
            })}
            key={command.id}
            onClick={onClick}
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
}

export default CommandItem;
