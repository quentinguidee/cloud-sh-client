import React from "react";
import classNames from "classnames";

type Props = React.HTMLProps<HTMLDivElement> & {
    symbol: string;
    size?: number;
};

function Symbol(props: Props) {
    const { symbol, className, style, size, ...others } = props;
    return (
        <span
            {...others}
            className={classNames("material-symbols-rounded", className)}
            style={{ fontSize: `${size ?? 20}px`, ...style }}
        >
            {symbol}
        </span>
    );
}

export default Symbol;
