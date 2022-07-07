import React, { CSSProperties } from "react";

import styles from "./ProgressBar.module.sass";

type Props = {
    // Between 0 and 100
    percentage: number;
};

function ProgressBar(props: Props) {
    const { percentage } = props;

    const innerStyle: CSSProperties = { width: `${percentage}%` };

    return (
        <div className={styles.bar}>
            <div style={innerStyle} className={styles.inner} />
        </div>
    );
}

export default ProgressBar;
