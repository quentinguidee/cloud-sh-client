import React from "react";

import styles from "./Input.module.sass";

type Props = React.HTMLProps<HTMLInputElement>;

function Input(props: Props) {
    return <input className={styles.input} {...props} />;
}

export default Input;
