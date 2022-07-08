import React from "react";
import { Node } from "Models/Node";
import Symbol from "Components/Symbol/Symbol";
import {
    siBabel,
    siC,
    siCplusplus,
    siCss3,
    siGit,
    siGnubash,
    siGo,
    siHtml5,
    siJavascript,
    siJson,
    siKotlin,
    siMarkdown,
    siOcaml,
    siPhp,
    siPython,
    siReact,
    siRuby,
    siSass,
    siScala,
    siTypescript,
    siYarn,
} from "simple-icons/icons";
import { SimpleIcon } from "simple-icons";

const icons: { [index: string]: SimpleIcon } = {
    babel: siBabel,
    c: siC,
    cpp: siCplusplus,
    css: siCss3,
    git: siGit,
    go: siGo,
    html: siHtml5,
    javascript: siJavascript,
    json: siJson,
    kotlin: siKotlin,
    markdown: siMarkdown,
    ocaml: siOcaml,
    php: siPhp,
    python: siPython,
    react: siReact,
    ruby: siRuby,
    sass: siSass,
    scala: siScala,
    shell: siGnubash,
    typescript: siTypescript,
    yarn: siYarn,
};

type Props = {
    node: Node;
};

function NodeSymbol(props: Props) {
    const { node } = props;

    if (!node) return null;

    // SimpleIcons
    const symbol: SimpleIcon = icons[node.type];
    if (symbol) {
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

    // Material symbols
    if (node.mime?.includes("image/")) {
        const color = "#2476e0";
        return <Symbol symbol="image" style={{ color }} size={24} />;
    }

    if (node.mime?.includes("video/")) {
        const color = "#eb5b34";
        return <Symbol symbol="movie" style={{ color }} size={24} />;
    }

    if (node.mime?.includes("audio/")) {
        const color = "#3e6a99";
        return <Symbol symbol="music_note" style={{ color }} size={24} />;
    }

    if (node.type === "directory") {
        const color = "var(--text-secondary)";
        return <Symbol symbol="folder" style={{ color }} size={24} />;
    }

    return <Symbol symbol="article" style={{ color: "#3e6a99" }} size={24} />;
}

export default NodeSymbol;
