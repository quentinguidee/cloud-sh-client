import React, { Ref } from "react";

import styles from "./Input.module.sass";
import classNames from "classnames";

type Props = React.HTMLProps<HTMLInputElement> & {
    small?: boolean;
};

function Input(props: Props, ref: Ref<HTMLInputElement>) {
    const { className, small, ...others } = props;
    return (
        <input
            ref={ref}
            className={classNames({
                [styles.input]: true,
                [styles.inputSmall]: small,
                [className]: true,
            })}
            {...others}
        />
    );
}

export default React.forwardRef(Input);
