import React from "react";
import PopoverItem, {
    PopoverItemProps,
} from "Components/PopoverItem/PopoverItem";
import Symbol from "Components/Symbol/Symbol";
import Layout from "Components/Layout/Layout";
import Spacer from "Components/Spacer/Spacer";

type Props = PopoverItemProps & {
    symbol: string;
};

function PopoverItemWithSymbol(props: Props) {
    const { symbol, children, ...others } = props;

    return (
        <PopoverItem {...others}>
            <Layout horizontal center gap={6}>
                <Symbol symbol={symbol} />
                {children}
                <Spacer width={2} />
            </Layout>
        </PopoverItem>
    );
}

export default PopoverItemWithSymbol;
