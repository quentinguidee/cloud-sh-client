import React from "react";
import classNames from "classnames";

import styles from "./Overlay.module.sass";

type Props = {
    show: boolean;
};

function Overlay(props: Props) {
    const { show } = props;
    return (
        <div
            className={classNames({
                [styles.overlay]: true,
                [styles.overlayShow]: show,
            })}
        />
    );
}

export default Overlay;
