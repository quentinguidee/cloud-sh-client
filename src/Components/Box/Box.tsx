import React from "react";

import styles from "./Box.module.sass";
import classNames from "classnames";

type Props = React.PropsWithChildren<{
    type?: "normal" | "info" | "warning" | "error";
}>;

function Box(props: Props) {
    const { children, type } = props;
    return (
        <div
            className={classNames({
                [styles.box]: true,
                [styles.boxInfo]: type === "info",
                [styles.boxWarning]: type === "warning",
                [styles.boxError]: type === "error",
            })}
        >
            {children}
        </div>
    );
}

export default Box;
