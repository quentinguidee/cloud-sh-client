import React from "react";
import { Link, To } from "react-router-dom";
import PopoverItemWithSymbol from "Components/PopoverItemWithSymbol/PopoverItemWithSymbol";

import styles from "./PopoverItemLink.module.sass";

type Props = React.PropsWithChildren<{
    to: To;
    symbol: string;
    className?: string;
}>;

function PopoverItemLink(props: Props) {
    const { to, symbol, children, className } = props;
    return (
        <PopoverItemWithSymbol symbol={symbol} className={className}>
            <Link to={to} className={styles.link}>
                {children}
            </Link>
        </PopoverItemWithSymbol>
    );
}

export default PopoverItemLink;
