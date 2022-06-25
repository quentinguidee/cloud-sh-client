import React from "react";

import styles from "./PopoverItem.module.sass";
import classNames from "classnames";
import { Link, To } from "react-router-dom";

export type PopoverItemProps = React.PropsWithChildren<{
    to?: To;
    className: string;
}>;

function PopoverItem(props: PopoverItemProps) {
    const { className, to, ...others } = props;

    const itemProps = {
        className: classNames(styles.item, className),
        ...others,
    };

    if (to) {
        return <Link to={to} {...itemProps} />;
    }
    return <div {...itemProps} />;
}

export default PopoverItem;
