import React from "react";
import { getColor, getSymbol, Node } from "Models/Node";
import Symbol from "Components/Symbol/Symbol";

type Props = {
    node: Node;
};

function NodeSymbol(props: Props) {
    const { node } = props;

    const symbol = getSymbol(node);
    const color = getColor(node);

    return <Symbol symbol={symbol} style={{ color }} size={24} />;
}

export default NodeSymbol;
