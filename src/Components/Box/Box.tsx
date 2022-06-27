import React from "react";

import styles from "./Box.module.sass";
import classNames from "classnames";
import { MessageType } from "Models/Message";

type Props = React.PropsWithChildren<{
    type?: MessageType;
    className?: string;
}>;

function Box(props: Props) {
    const { children, className, type } = props;
    return (
        <div
            className={classNames({
                [styles.box]: true,
                [styles.boxInfo]: type === "info",
                [styles.boxWarning]: type === "warning",
                [styles.boxError]: type === "error",
                [className]: true,
            })}
        >
            {children}
        </div>
    );
}

export default Box;
