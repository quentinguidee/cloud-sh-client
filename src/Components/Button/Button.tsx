import classNames from "classnames";
import Layout from "Components/Layout/Layout";
import React from "react";

import styles from "./Button.module.sass";

type Props = React.HTMLProps<HTMLDivElement>;

function Button(props: Props) {
    const { children, className, disabled, ...others } = props;

    return (
        <div
            {...others}
            className={classNames({
                [styles.button]: true,
                [styles.buttonDisabled]: disabled,
                [className]: true,
            })}
        >
            <Layout horizontal center gap={6}>
                {children}
            </Layout>
        </div>
    );
}

export default Button;
