import React from "react";
import classNames from "classnames";

type Props = React.HTMLProps<HTMLDivElement> & {
    symbol: string;
    size?: number;
};

function Icon(props: Props) {
    const { symbol, className, style, size, ...others } = props;
    return (
        <span
            {...others}
            className={classNames("material-icons-round", className)}
            style={{ fontSize: `${size ?? 20}px`, ...style }}
        >
            {symbol}
        </span>
    );
}

export default Icon;
