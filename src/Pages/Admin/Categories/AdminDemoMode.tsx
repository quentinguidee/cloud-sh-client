import React, { useEffect, useState } from "react";
import TitleBar from "Layouts/TitleBar/TitleBar";
import Paragraph from "Components/Paragraph/Paragraph";
import Layout from "Components/Layout/Layout";
import Symbol from "Components/Symbol/Symbol";
import { Text } from "Components/Text/Text";
import Box from "Components/Box/Box";
import Button from "Components/Button/Button";
import Checkbox from "Components/Checkbox/Checkbox";
import axios from "axios";
import { api, route } from "Backend/api";
import { useToken } from "Store/Hooks/useToken";
import { useNavigate } from "react-router-dom";
import { pushMessage } from "Store/Slices/MessagesSlice";
import { useDispatch } from "react-redux";

function AdminDemoModeLoading() {
    return (
        <Box>
            <Layout horizontal center gap={8}>
                <Symbol symbol="info" />
                <Text>Loading...</Text>
            </Layout>
        </Box>
    );
}

function AdminDemoModeDisabled() {
    const dispatch = useDispatch();

    const token = useToken();

    const navigate = useNavigate();

    const [firstCheck, setFirstCheck] = useState<boolean>(false);
    const [secondCheck, setSecondCheck] = useState<boolean>(false);

    const canBeEnabled = () => {
        return firstCheck && secondCheck;
    };

    const enable = () => {
        if (!canBeEnabled()) return;
        axios({
            method: "POST",
            url: route("/admin/demo"),
            headers: {
                Authorization: token,
            },
        })
            .then(() => {
                dispatch(
                    pushMessage({
                        type: "info",
                        message: "Demo mode enabled successfully.",
                    }),
                );
                navigate("/login");
            })
            .catch(api.error);
    };

    return (
        <React.Fragment>
            <Box type="warning">
                <Layout horizontal center gap={8}>
                    <Symbol symbol="warning" />
                    <Text>All data will be destroyed.</Text>
                </Layout>
            </Box>
            <Checkbox onChange={(c) => setFirstCheck(c)}>
                I understand that all data will be destroyed.
            </Checkbox>
            <Checkbox onChange={(c) => setSecondCheck(c)}>
                I understand that, in the demo mode, all files are deleted
                periodically.
            </Checkbox>
            <Button disabled={!canBeEnabled()} onClick={enable}>
                <Text>Enable and logout</Text>
            </Button>
        </React.Fragment>
    );
}

function AdminDemoModeEnabled() {
    return (
        <Box type="info">
            <Layout horizontal center gap={8}>
                <Symbol symbol="info" />
                <Text>This mode is already enabled.</Text>
            </Layout>
        </Box>
    );
}

function AdminDemoMode() {
    const token = useToken();

    const [content, setContent] = useState(<AdminDemoModeLoading />);

    useEffect(() => {
        axios({
            method: "GET",
            url: route("/admin/demo"),
            headers: {
                Authorization: token,
            },
        })
            .then((res) => {
                if (res?.data?.demo_mode?.enabled === false) {
                    setContent(<AdminDemoModeDisabled />);
                } else {
                    setContent(<AdminDemoModeEnabled />);
                }
            })
            .catch(api.error);
    }, []);

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
                {content}
            </Layout>
        </React.Fragment>
    );
}

export default AdminDemoMode;
