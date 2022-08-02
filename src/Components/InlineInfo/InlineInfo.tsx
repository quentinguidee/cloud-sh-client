import React from "react";
import { Text } from "Components/Text/Text";

type Props = React.PropsWithChildren<{
    title: string;
}>;

function InlineInfo(props: Props) {
    const { title, children } = props;

    return (
        <Text>
            {title}: {children}
        </Text>
    );
}

export default InlineInfo;
