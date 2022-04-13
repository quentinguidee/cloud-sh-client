import classNames from "classnames";
import Layout from "Components/Layout/Layout";
import React from "react";

import styles from "./Button.module.sass";

type Props = React.HTMLProps<HTMLDivElement>;

function Button(props: Props) {
    const { children, className, ...others } = props;

    return (
        <div {...others} className={classNames(styles.button, className)}>
            <Layout horizontal center gap={6}>
                {children}
            </Layout>
        </div>
    );
}

export default Button;
