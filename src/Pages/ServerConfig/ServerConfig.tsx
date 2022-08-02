import React, { useState } from "react";
import styles from "./ServerConfig.module.sass";
import { Subtitle } from "Components/Title/Title";
import Input from "Components/Input/Input";
import Layout from "Components/Layout/Layout";
import Button from "Components/Button/Button";
import Symbol from "Components/Symbol/Symbol";
import { Text } from "Components/Text/Text";
import axios from "axios";
import { api, route } from "Backend/api";
import { useNavigate } from "react-router-dom";

function DatabaseConfig() {
    const [host, setHost] = useState<string>();
    const [name, setName] = useState<string>();
    const [user, setUser] = useState<string>();
    const [password, setPassword] = useState<string>();

    const navigate = useNavigate();

    const save = () => {
        axios({
            method: "POST",
            url: route("/config/database"),
            params: { host, name, user, password },
        })
            .then(() => navigate("/login"))
            .catch(api.error);
    };

    const onHostChange = (e) => setHost(e.target.value);
    const onNameChange = (e) => setName(e.target.value);
    const onUserChange = (e) => setUser(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    return (
        <div className={styles.content}>
            <Layout vertical left gap={24}>
                <Subtitle>Database setup</Subtitle>
                <Layout right vertical gap={20}>
                    <Layout stretch vertical gap={12} className={styles.fields}>
                        <Input
                            placeholder="URL"
                            type="url"
                            value={host}
                            onChange={onHostChange}
                        />
                        <Input
                            placeholder="Database"
                            type="text"
                            value={name}
                            onChange={onNameChange}
                        />
                        <Input
                            placeholder="Username"
                            type="text"
                            value={user}
                            onChange={onUserChange}
                        />
                        <Input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={onPasswordChange}
                        />
                    </Layout>
                    <Button onClick={save}>
                        <Text>Try to connect</Text>
                        <Symbol symbol="network_check" />
                    </Button>
                </Layout>
            </Layout>
        </div>
    );
}

function ServerConfig() {
    return <DatabaseConfig />;
}

export default ServerConfig;
