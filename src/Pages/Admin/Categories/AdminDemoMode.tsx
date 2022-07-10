import React, { useState } from "react";
import TitleBar from "Layouts/TitleBar/TitleBar";
import Paragraph from "Components/Paragraph/Paragraph";
import Layout from "Components/Layout/Layout";
import Symbol from "Components/Symbol/Symbol";
import { Text } from "Components/Text/Text";
import Box from "Components/Box/Box";
import Button from "Components/Button/Button";
import Checkbox from "Components/Checkbox/Checkbox";
import axios from "axios";
import { api } from "Backend/api";

function AdminDemoMode() {
    const [firstCheck, setFirstCheck] = useState<boolean>(false);
    const [secondCheck, setSecondCheck] = useState<boolean>(false);

    const canBeEnabled = () => {
        return firstCheck && secondCheck;
    };

    const enable = () => {
        if (!canBeEnabled()) return;
        axios.put("/admin/demo").then(console.log).catch(api.error);
    };

    return (
        <React.Fragment>
            <TitleBar title="Demo mode" />
            <Layout left vertical gap={18}>
                <Paragraph>
                    Enable the Demo mode allows you to turn your cloud server
                    into a demo server. Every 24 hours, the entire storage is
                    reset, and new users will get placeholder files to try some
                    cloud.sh features.
                </Paragraph>
                <Box type="warning">
                    <Layout horizontal center gap={8}>
                        <Symbol symbol="warning" />
                        <Text>All your data will be destroyed.</Text>
                    </Layout>
                </Box>
                <Checkbox onChange={(c) => setFirstCheck(c)}>
                    I understand that all my data will be destroyed.
                </Checkbox>
                <Checkbox onChange={(c) => setSecondCheck(c)}>
                    I understand that, in the demo mode, all files are deleted
                    periodically.
                </Checkbox>
                <Button disabled={!canBeEnabled()} onClick={enable}>
                    <Text>Enable</Text>
                </Button>
            </Layout>
        </React.Fragment>
    );
}

export default AdminDemoMode;
