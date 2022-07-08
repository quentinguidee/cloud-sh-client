import React, { useEffect } from "react";
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

    const dismiss = () => {
        if (onClick) onClick();
    };

    const onKeyDown = (e) => {
        if (e.key === "Escape") {
            dismiss();
        }
    };

    useEffect(() => {
        props.show
            ? document.addEventListener("keydown", onKeyDown)
            : document.removeEventListener("keydown", onKeyDown);
    }, [props.show]);

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
