import React from "react";
import Layout from "Components/Layout/Layout";

type Props = React.PropsWithChildren<{}>;

function Toolbar(props: Props) {
    const { children } = props;
    return (
        <Layout horizontal gap={6}>
            {children}
        </Layout>
    );
}

export default Toolbar;
