import React from "react";
import classNames from "classnames";

import styles from "./Symbol.module.sass";

type Props = React.HTMLProps<HTMLDivElement> & {
    symbol: string;
    size?: number;
    spinning?: boolean;
};

function Symbol(props: Props) {
    const { symbol, className, style, size, spinning, ...others } = props;
    return (
        <span
            {...others}
            className={classNames({
                ["material-symbols-rounded"]: true,
                [styles.symbol]: true,
                [styles.spinning]: spinning,
                [className]: true,
            })}
            style={{ fontSize: `${size ?? 20}px`, ...style }}
        >
            {symbol}
        </span>
    );
}

export default Symbol;
