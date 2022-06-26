import React from "react";

import styles from "./PopoverItem.module.sass";
import classNames from "classnames";
import { Link, To } from "react-router-dom";

export type PopoverItemProps = React.PropsWithChildren<{
    to?: To;
    onClick?: () => void;
    className?: string;
    noPadding?: boolean;
}>;

function PopoverItem(props: PopoverItemProps) {
    const { className, to, onClick, noPadding, ...others } = props;

    const itemProps = {
        className: classNames({
            [styles.item]: true,
            [styles.itemSelectable]: to || onClick,
            [styles.itemNoPadding]: noPadding,
            [className]: true,
        }),
        onClick,
        ...others,
    };

    if (to) {
        return <Link to={to} {...itemProps} />;
    }
    return <div {...itemProps} />;
}

export default PopoverItem;