import React, { CSSProperties, useEffect, useState } from "react";
import Overlay from "Components/Overlay/Overlay";

import styles from "./Popover.module.sass";
import classNames from "classnames";

type Props = React.PropsWithChildren<{
    show: boolean;
    className?: string;
    style?: CSSProperties;
    onClose?: () => void;
}>;

function Popover(props: Props) {
    const { children, style, onClose } = props;

    const [show, setShow] = useState<boolean>(props.show);

    const dismiss = () => {
        setShow(false);
        if (onClose) onClose();
    };

    const onKeyDown = (e) => {
        if (e.key === "Escape") {
            dismiss();
        }
    };

    useEffect(() => {
        setShow(props.show);
        props.show
            ? document.addEventListener("keydown", onKeyDown)
            : document.removeEventListener("keydown", onKeyDown);
    }, [props.show]);

    return (
        <React.Fragment>
            <Overlay show={show} onClick={dismiss} />
            <div
                className={classNames({
                    [styles.popover]: true,
                    [styles.popoverShow]: show,
                })}
                style={style}
            >
                {children}
            </div>
        </React.Fragment>
    );
}

export default Popover;
