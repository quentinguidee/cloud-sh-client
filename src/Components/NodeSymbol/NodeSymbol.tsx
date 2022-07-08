import React from "react";
import { Node } from "Models/Node";
import Symbol from "Components/Symbol/Symbol";
import { siC, siCplusplus, siPython } from "simple-icons/icons";
import { SimpleIcon } from "simple-icons";

const icons: { [index: string]: SimpleIcon } = {
    c: siC,
    cpp: siCplusplus,
    python: siPython,
};

type Props = {
    node: Node;
};

function NodeSymbol(props: Props) {
    const { node } = props;

    // Material symbols
    switch (node.type) {
        case "file":
            return (
                <Symbol
                    symbol="article"
                    style={{ color: "#3e6a99" }}
                    size={24}
                />
            );
        case "directory":
            return (
                <Symbol
                    symbol="folder"
                    style={{ color: "var(--text-secondary)" }}
                    size={24}
                />
            );
    }

    // SimpleIcons
    const symbol: SimpleIcon = icons[node.type];

    const src = `data:image/svg+xml;utf8,<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="%23${symbol.hex}" d="${symbol.path}" /></svg>`;

    return (
        <img
            height={20}
            width={20}
            alt={symbol.title}
            style={{ margin: "2px" }}
            src={src}
        />
    );
}

export default NodeSymbol;
