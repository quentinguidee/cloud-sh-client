import React from "react";
import classNames from "classnames";

import styles from "./Overlay.module.sass";

type Props = {
    show: boolean;
    onClick?: () => void;
};

function Overlay(props: Props) {
    const { show, onClick } = props;

    const onContextMenu = (e) => {
        e.preventDefault();
        if (onClick) onClick();
    };

    return (
        <div
            className={classNames({
                [styles.overlay]: true,
                [styles.overlayShow]: show,
            })}
            onClick={onClick}
            onContextMenu={onContextMenu}
        />
    );
}

export default Overlay;
