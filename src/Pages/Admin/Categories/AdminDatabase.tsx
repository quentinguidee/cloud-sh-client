import React, { Fragment, useEffect, useState } from "react";
import TitleBar from "Layouts/TitleBar/TitleBar";
import axios from "axios";
import { useToken } from "Store/Hooks/useToken";
import { api, route } from "Backend/api";
import InlineInfo from "Components/InlineInfo/InlineInfo";
import Code from "Components/Code/Code";
import Layout from "Components/Layout/Layout";
import { Text } from "Components/Text/Text";

type Database = {
    host?: string;
    name?: string;
    user?: string;
    password?: string;
};

function AdminDatabase() {
    const token = useToken();

    const [database, setDatabase] = useState<Database>({});

    const load = () => {
        axios({
            url: route("/admin/database"),
            headers: {
                Authorization: token,
            },
        })
            .then((res) => setDatabase(res.data))
            .catch(api.error);
    };

    useEffect(() => load(), []);

    const { host, name, user, password } = database;

    let component;
    if (host === undefined) {
        component = <Text>Loading...</Text>;
    } else {
        component = (
            <Fragment>
                <InlineInfo title="host">
                    <Code>{host}</Code>
                </InlineInfo>
                <InlineInfo title="name">
                    <Code>{name}</Code>
                </InlineInfo>
                <InlineInfo title="user">
                    <Code>{user}</Code>
                </InlineInfo>
                <InlineInfo title="password">
                    <Code>{password}</Code>
                </InlineInfo>
            </Fragment>
        );
    }

    return (
        <React.Fragment>
            <TitleBar title="Database" />
            <Layout vertical left gap={8}>
                {component}
            </Layout>
        </React.Fragment>
    );
}

export default AdminDatabase;
