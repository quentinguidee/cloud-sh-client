import React from "react";

import styles from "./PopoverItem.module.sass";
import classNames from "classnames";

export type PopoverItemProps = React.HTMLProps<HTMLDivElement>;

function PopoverItem(props: PopoverItemProps) {
    const { className, ...others } = props;
    return <div className={classNames(styles.item, className)} {...others} />;
}

export default PopoverItem;
