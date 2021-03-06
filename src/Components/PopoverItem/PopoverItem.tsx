import React from "react";

import styles from "./PopoverItem.module.sass";
import classNames from "classnames";
import { Link, To } from "react-router-dom";

export type PopoverItemProps = React.PropsWithChildren<{
    to?: To;
    onClick?: () => void;
    className?: string;
    noPadding?: boolean;
    red?: boolean;
    disabled?: boolean;
}>;

function PopoverItem(props: PopoverItemProps) {
    const { className, to, onClick, noPadding, red, disabled, ...others } =
        props;

    const itemProps = {
        className: classNames({
            [styles.item]: true,
            [styles.itemSelectable]: to || onClick,
            [styles.itemNoPadding]: noPadding,
            [styles.itemRed]: red,
            [styles.itemDisabled]: disabled,
            [className]: true,
        }),
        onClick: () => {
            if (disabled) return;
            if (onClick) onClick();
        },
        ...others,
    };

    if (to) {
        return <Link to={to} {...itemProps} />;
    }
    return <div {...itemProps} />;
}

export default PopoverItem;
