import React from "react";

import Layout from "Components/Layout/Layout";
import { Title } from "Components/Title/Title";
import Spacer from "Components/Spacer/Spacer";
import Account from "Layouts/Account/Account";

type Props = {
    title: string;
};

function TitleBar(props: Props) {
    const { title } = props;
    return (
        <Layout horizontal>
            <Title>{title}</Title>
            <Spacer />
            <Account />
        </Layout>
    );
}

export default TitleBar;
