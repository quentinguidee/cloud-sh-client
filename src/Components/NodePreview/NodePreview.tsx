import React from "react";
import Overlay from "Components/Overlay/Overlay";
import styles from "./NodePreview.module.sass";
import { Node } from "Models/Node";
import classNames from "classnames";

type Props = {
    node?: Node;
    onClose?: () => void;
};

function NodePreview(props: Props) {
    const { node, onClose } = props;

    return (
        <React.Fragment>
            <Overlay show={node !== undefined} onClick={onClose} />
            <div
                className={classNames({
                    [styles.window]: true,
                    [styles.windowShow]: node !== undefined,
                })}
            ></div>
        </React.Fragment>
    );
}

export default NodePreview;
