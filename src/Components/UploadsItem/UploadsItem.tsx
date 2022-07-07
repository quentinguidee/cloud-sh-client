import React, { CSSProperties } from "react";

import styles from "./UploadsItem.module.sass";
import Text from "Components/Text/Text";
import { getIcon, Node } from "Models/Node";
import Symbol from "Components/Symbol/Symbol";
import Layout from "Components/Layout/Layout";
import Spacer from "Components/Spacer/Spacer";

type Props = React.HTMLProps<HTMLDivElement> & {
    node: Node;
    percentage?: number;
};

function UploadsItem(props: Props) {
    const { node, percentage } = props;

    const progressStyle: CSSProperties = {
        width: percentage ?? `${percentage}%`,
    };

    const finished = percentage === 100;

    return (
        <Layout horizontal center gap={8} className={styles.item}>
            <div className={styles.progress} style={progressStyle} />
            <Symbol symbol={getIcon(node)} />
            <Text>{node.name}</Text>
            <Spacer />
            <Text>{percentage ?? 0}%</Text>
            <Symbol
                spinning={!finished}
                symbol={finished ? "check_circle" : "sync"}
            />
        </Layout>
    );
}

export default UploadsItem;
