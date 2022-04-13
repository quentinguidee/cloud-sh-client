import React from "react";
import classNames from "classnames";

type Props = React.HTMLProps<HTMLDivElement> & {
    symbol: string;
};

function Icon(props: Props) {
    const { symbol, className, ...others } = props;
    return (
        <span
            {...others}
            className={classNames("material-icons-round", className)}
        >
            {symbol}
        </span>
    );
}

export default Icon;
