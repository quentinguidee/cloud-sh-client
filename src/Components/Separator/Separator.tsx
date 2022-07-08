import React from "react";

import styles from "./Separator.module.sass";
import classNames from "classnames";

type Props = {
    className?: string;
};

function Separator(props: Props) {
    const { className } = props;
    return <div className={classNames(styles.separator, className)} />;
}

export default Separator;
