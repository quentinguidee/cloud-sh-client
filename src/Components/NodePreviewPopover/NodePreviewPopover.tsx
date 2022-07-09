import React from "react";
import Overlay from "Components/Overlay/Overlay";
import styles from "./NodePreviewPopover.module.sass";
import { Node } from "Models/Node";
import classNames from "classnames";
import Layout from "Components/Layout/Layout";
import Spacer from "Components/Spacer/Spacer";
import Close from "Components/Close/Close";
import { Caption } from "Components/Text/Text";
import { Subtitle } from "Components/Title/Title";
import NodePreview from "Components/NodePreview/NodePreview";

type Props = {
    node?: Node;
    onClose?: () => void;
};

function NodePreviewPopoverTitle(props: Props) {
    const { node, onClose } = props;

    return (
        <Layout horizontal center className={styles.titleBar}>
            <Layout vertical left gap={2}>
                <Subtitle>Preview</Subtitle>
                <Caption>{node?.name}</Caption>
            </Layout>
            <Spacer />
            <Spacer width={24} />
            <Close onClick={onClose} />
        </Layout>
    );
}

function NodePreviewPopover(props: Props) {
    const { node } = props;

    const onClose = () => {
        if (props.onClose) props.onClose();
    };

    return (
        <React.Fragment>
            <Overlay show={node !== undefined} onClick={onClose} />
            <Layout
                vertical
                className={classNames({
                    [styles.window]: true,
                    [styles.windowShow]: node !== undefined,
                })}
            >
                <NodePreviewPopoverTitle node={node} onClose={onClose} />
                <Layout middle className={styles.content}>
                    <NodePreview node={node} />
                </Layout>
            </Layout>
        </React.Fragment>
    );
}

export default NodePreviewPopover;
