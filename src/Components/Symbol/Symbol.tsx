import React from "react";
import classNames from "classnames";

import styles from "./Symbol.module.sass";

type Props = React.HTMLProps<HTMLDivElement> & {
    symbol: string;
    size?: number;
};

function Symbol(props: Props) {
    const { symbol, className, style, size, ...others } = props;
    return (
        <span
            {...others}
            className={classNames(
                "material-symbols-rounded",
                styles.symbol,
                className,
            )}
            style={{ fontSize: `${size ?? 20}px`, ...style }}
        >
            {symbol}
        </span>
    );
}

export default Symbol;
