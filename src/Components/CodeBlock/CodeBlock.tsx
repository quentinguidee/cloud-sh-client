import React from "react";

import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/src/styles/hljs";

type Props = React.PropsWithChildren<any>;

function CodeBlock(props: Props) {
    const { ...others } = props;

    return (
        <SyntaxHighlighter
            showLineNumbers={true}
            style={atomOneDark}
            customStyle={{
                fontFamily: "var(--font-family-code)",
                fontSize: "var(--size-caption)",
                lineHeight: 1.3,
                minWidth: "100%",
            }}
            {...others}
        />
    );
}

export default CodeBlock;
