import React from "react";

import styles from "./Code.module.sass";

type Props = React.HTMLProps<HTMLElement>;

function Code(props: Props) {
    return <code className={styles.code} {...props} />;
}

export default Code;
