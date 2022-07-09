import React from "react";
import Layout from "Components/Layout/Layout";
import { Subtitle } from "Components/Title/Title";

import styles from "./NodeInfo.module.sass";
import { Node } from "Models/Node";
import NodeSymbol from "Components/NodeSymbol/NodeSymbol";
import Spacer from "Components/Spacer/Spacer";
import Close from "Components/Close/Close";
import { Caption } from "Components/Text/Text";
import prettyBytes from "pretty-bytes";
import classNames from "classnames";
import Overlay from "Components/Overlay/Overlay";
import NodePreview from "Components/NodePreview/NodePreview";

type Props = {
    node?: Node;
    onClose?: () => void;
};

function NodeInfo(props: Props) {
    const { node, onClose } = props;

    const size = node?.size ? prettyBytes(node?.size) : undefined;

    return (
        <React.Fragment>
            <Overlay show={node !== undefined} onClick={onClose} />
            <Layout
                vertical
                className={classNames({
                    [styles.info]: true,
                    [styles.infoShown]: node,
                })}
            >
                <NodePreview className={styles.preview} node={node} />
                <Layout horizontal center gap={12} className={styles.titleBar}>
                    <NodeSymbol node={node} />
                    <Layout vertical gap={2}>
                        <Subtitle className={styles.title}>
                            {node?.name}
                        </Subtitle>
                        {size && <Caption>{size}</Caption>}
                    </Layout>
                    <Spacer />
                    <Close onClick={onClose} />
                </Layout>
            </Layout>
        </React.Fragment>
    );
}

export default NodeInfo;
