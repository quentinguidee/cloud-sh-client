import React from "react";

type Props = React.HTMLProps<HTMLSpanElement>;

function Text(props: Props) {
    const { className, ...others } = props;
    return <span {...others} />;
}

export default Text;
