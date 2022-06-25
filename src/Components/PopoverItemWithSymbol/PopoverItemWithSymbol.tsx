import React from "react";
import PopoverItem, {
    PopoverItemProps,
} from "Components/PopoverItem/PopoverItem";
import Symbol from "Components/Icon/Symbol";
import Layout from "Components/Layout/Layout";
import Spacer from "Components/Spacer/Spacer";

type Props = PopoverItemProps & {
    symbol: string;
};

function PopoverItemWithSymbol(props: Props) {
    const { symbol, children, ...others } = props;

    return (
        <PopoverItem {...others}>
            <Layout horizontal center>
                <Symbol symbol={symbol} />
                <Spacer width={6} />
                {children}
            </Layout>
        </PopoverItem>
    );
}

export default PopoverItemWithSymbol;
