import classNames from "classnames";
import React from "react";

import styles from "./Logo.module.sass";

type Props = React.HTMLProps<HTMLDivElement>;

function Logo(props: Props) {
    const { className, ...others } = props;
    return (
        <span {...others} className={classNames(styles.logo, className)}>
            sh.Cloud
        </span>
    );
}

export default Logo;
