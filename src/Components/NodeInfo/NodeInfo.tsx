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
import Info from "Components/Info/Info";

type Props = {
    node?: Node;
    onClose?: () => void;
};

function NodeInfo(props: Props) {
    const { node, onClose } = props;

    const size = node?.size ? prettyBytes(node?.size) : undefined;

    let fields = [];

    if (node?.created_at) {
        fields.push(
            <Info title="Created at">
                {new Date(node?.created_at).toLocaleString()}
            </Info>,
        );
    }

    if (node?.updated_at) {
        fields.push(
            <Info title="Last update">
                {new Date(node?.updated_at).toLocaleString()}
            </Info>,
        );
    }

    if (node?.mime) {
        fields.push(<Info title="MIME">{node?.mime}</Info>);
    }

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
                <Layout vertical gap={16} className={styles.content}>
                    {fields}
                </Layout>
            </Layout>
        </React.Fragment>
    );
}

export default NodeInfo;
