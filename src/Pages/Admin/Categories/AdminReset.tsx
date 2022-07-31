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
import { api, route } from "Backend/api";
import { useToken } from "Store/Hooks/useToken";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { pushMessage } from "Store/Slices/MessagesSlice";

function AdminReset() {
    const dispatch = useDispatch();
    const token = useToken();

    const navigate = useNavigate();

    const [check, setCheck] = useState<boolean>(false);

    const canBeReset = () => {
        return check;
    };

    const reset = () => {
        if (!canBeReset()) return;
        axios({
            method: "POST",
            url: route("/admin/reset"),
            headers: {
                Authorization: token,
            },
        })
            .then(() => {
                dispatch(
                    pushMessage({
                        type: "info",
                        message: "The server has been reset successfully.",
                    }),
                );
                navigate("/login");
            })
            .catch(api.error);
    };

    return (
        <React.Fragment>
            <TitleBar title="Reset" />
            <Layout left vertical gap={18}>
                <Paragraph>
                    Reset will delete everything stored in your cloud.sh server.
                </Paragraph>
                <Box type="warning">
                    <Layout horizontal center gap={8}>
                        <Symbol symbol="warning" />
                        <Text>All data will be destroyed.</Text>
                    </Layout>
                </Box>
                <Checkbox onChange={(c) => setCheck(c)}>
                    I understand that all data will be destroyed.
                </Checkbox>
                <Button disabled={!canBeReset()} onClick={reset}>
                    <Text>Reset and logout</Text>
                </Button>
            </Layout>
        </React.Fragment>
    );
}

export default AdminReset;
