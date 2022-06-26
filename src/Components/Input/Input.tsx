import React, { Ref } from "react";

import styles from "./Input.module.sass";
import classNames from "classnames";

type Props = React.HTMLProps<HTMLInputElement>;

function Input(props: Props, ref: Ref<HTMLInputElement>) {
    const { ref: _, className, ...others } = props;
    return (
        <input
            ref={ref}
            className={classNames(styles.input, className)}
            {...others}
        />
    );
}

export default React.forwardRef(Input);
