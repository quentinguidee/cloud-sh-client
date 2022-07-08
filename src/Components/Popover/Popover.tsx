import React, { CSSProperties, useEffect, useState } from "react";
import Overlay from "Components/Overlay/Overlay";

import styles from "./Popover.module.sass";
import classNames from "classnames";

type Props = React.PropsWithChildren<{
    show: boolean;
    className?: string;
    style?: CSSProperties;
    onClose?: () => void;
    animateFrom?:
        | "top right"
        | "top center"
        | "top left"
        | "bottom right"
        | "bottom center"
        | "bottom left"
        | "center right"
        | "center center"
        | "center left";
}>;

function Popover(props: Props) {
    const { children, style, onClose, animateFrom, className } = props;

    const [show, setShow] = useState<boolean>(props.show);

    const dismiss = () => {
        setShow(false);
        if (onClose) onClose();
    };

    useEffect(() => setShow(props.show), [props.show]);

    return (
        <React.Fragment>
            <Overlay show={show} onClick={dismiss} />
            <div
                className={classNames({
                    [styles.popover]: true,
                    [styles.popoverShow]: show,
                    [className]: true,
                })}
                style={{
                    transformOrigin: animateFrom ?? "center center",
                    ...style,
                }}
            >
                {children}
            </div>
        </React.Fragment>
    );
}

export default Popover;
