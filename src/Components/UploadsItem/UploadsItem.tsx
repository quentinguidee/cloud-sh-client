import React, { CSSProperties } from "react";

import styles from "./UploadsItem.module.sass";
import Text from "Components/Text/Text";
import { NodeUpload } from "Models/Node";
import Symbol from "Components/Symbol/Symbol";
import Layout from "Components/Layout/Layout";
import Spacer from "Components/Spacer/Spacer";
import NodeSymbol from "Components/NodeSymbol/NodeSymbol";

type Props = React.HTMLProps<HTMLDivElement> & {
    node: NodeUpload;
};

function UploadsItem(props: Props) {
    const { node } = props;
    const { percentage } = node;

    const progressStyle: CSSProperties = {
        width: percentage ? `${percentage}%` : undefined,
    };

    const finished = percentage === 100;

    return (
        <Layout horizontal center gap={14} className={styles.item}>
            <div className={styles.progress} style={progressStyle} />
            <NodeSymbol node={node} />
            <Text>{node.name}</Text>
            <Spacer />
            {!finished && <Text>{percentage ?? 0}%</Text>}
            <Symbol
                style={{
                    color: finished
                        ? "var(--text-green)"
                        : "var(--text-primary)",
                }}
                spinning={!finished}
                symbol={finished ? "check_circle" : "sync"}
            />
        </Layout>
    );
}

export default UploadsItem;
