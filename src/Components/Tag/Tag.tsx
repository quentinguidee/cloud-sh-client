import React from "react";

import styles from "./Tag.module.sass";
import Layout from "Components/Layout/Layout";

type Props = React.PropsWithChildren<{
    color: "red" | "green";
}>;

function Tag(props: Props) {
    const { color, children } = props;

    let backgroundColor;
    switch (color) {
        case "red":
            backgroundColor = "var(--text-red)";
            break;
        case "green":
            backgroundColor = "var(--text-green)";
            break;
    }

    return (
        <Layout horizontal center gap={6} className={styles.tag}>
            <div className={styles.tagDot} style={{ backgroundColor }} />
            {children}
        </Layout>
    );
}

export default Tag;
