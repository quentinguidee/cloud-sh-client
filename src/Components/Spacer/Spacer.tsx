import React from "react";

import styles from "./Spacer.module.sass";

type Props = {
    width?: number;
    height?: number;
};

function Spacer(props: Props) {
    const { width, height } = props;

    if (width) {
        return <div style={{ width }} />;
    }

    if (height) {
        return <div style={{ height }} />;
    }

    return <div className={styles.spacer} />;
}

export default Spacer;
