import React from "react";
import Symbol from "Components/Symbol/Symbol";
import { Text } from "Components/Text/Text";

import styles from "./ToolbarItem.module.sass";
import Layout from "Components/Layout/Layout";

type Props = {
    symbol: string;
    text?: string;
    onClick?: () => void;
};

function ToolbarItem(props: Props) {
    const { symbol, text, onClick } = props;

    return (
        <Layout
            horizontal
            center
            gap={6}
            className={styles.item}
            onClick={onClick}
        >
            <Symbol symbol={symbol} />
            {text && <Text>{text}</Text>}
        </Layout>
    );
}

export default ToolbarItem;
