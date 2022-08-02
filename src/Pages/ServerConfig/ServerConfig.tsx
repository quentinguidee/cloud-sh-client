import React, { useEffect, useState } from "react";
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

type StepProps = {
    onDone: () => void;
};

function DatabaseConfig(props: StepProps) {
    const [host, setHost] = useState<string>();
    const [name, setName] = useState<string>();
    const [user, setUser] = useState<string>();
    const [password, setPassword] = useState<string>();

    const save = () => {
        axios({
            method: "POST",
            url: route("/config/database"),
            params: { host, name, user, password },
        })
            .then(() => props.onDone())
            .catch(api.error);
    };

    const onHostChange = (e) => setHost(e.target.value);
    const onNameChange = (e) => setName(e.target.value);
    const onUserChange = (e) => setUser(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    return (
        <div className={styles.content}>
            <Layout vertical left gap={32}>
                <Subtitle style={{ marginLeft: 12 }}>Database setup</Subtitle>
                <Layout right vertical gap={32}>
                    <Layout stretch vertical gap={20} className={styles.fields}>
                        <Input
                            label="URL"
                            name="url"
                            placeholder="localhost"
                            type="url"
                            value={host}
                            onChange={onHostChange}
                        />
                        <Input
                            label="Name"
                            name="name"
                            placeholder="cloudsh"
                            type="text"
                            value={name}
                            onChange={onNameChange}
                        />
                        <Input
                            label="Username"
                            name="username"
                            placeholder="jean.dupont"
                            type="text"
                            value={user}
                            onChange={onUserChange}
                        />
                        <Input
                            label="Password"
                            name="password"
                            placeholder="***"
                            type="password"
                            value={password}
                            onChange={onPasswordChange}
                        />
                    </Layout>
                    <Button onClick={save}>
                        <Text>Connect</Text>
                        <Symbol symbol="network_check" />
                    </Button>
                </Layout>
            </Layout>
        </div>
    );
}

function OAuthConfig(props: StepProps) {
    const [name, setName] = useState<string>();
    const [color, setColor] = useState<string>();
    const [clientID, setClientID] = useState<string>();
    const [clientSecret, setClientSecret] = useState<string>();
    const [authorizeURL, setAuthorizeURL] = useState<string>();
    const [accessTokenURL, setAccessTokenURL] = useState<string>();
    const [redirectURL, setRedirectURL] = useState<string>();

    const save = () => {
        axios({
            method: "POST",
            url: route("/config/oauth"),
            params: {
                name,
                color,
                client_id: clientID,
                client_secret: clientSecret,
                authorize_url: authorizeURL,
                access_token_url: accessTokenURL,
                redirect_url: redirectURL,
            },
        })
            .then(() => props.onDone())
            .catch(api.error);
    };

    const onNameChange = (e) => {
        setName(e.target.value);
    };
    const onColorChange = (e) => {
        setColor(e.target.value);
    };
    const onClientIDChange = (e) => {
        setClientID(e.target.value);
    };
    const onClientSecretChange = (e) => {
        setClientSecret(e.target.value);
    };
    const onAuthorizeURLChange = (e) => {
        setAuthorizeURL(e.target.value);
    };
    const onAccessTokenURLChange = (e) => {
        setAccessTokenURL(e.target.value);
    };
    const onRedirectURLChange = (e) => {
        setRedirectURL(e.target.value);
    };

    return (
        <div className={styles.content}>
            <Layout vertical left gap={32}>
                <Subtitle style={{ marginLeft: 12 }}>
                    Authentication setup
                </Subtitle>
                <Layout right vertical gap={32}>
                    <Layout stretch vertical gap={20} className={styles.fields}>
                        <Input
                            label="Provider"
                            name="name"
                            placeholder="GitHub"
                            type="text"
                            value={name}
                            onChange={onNameChange}
                        />
                        <Input
                            label="Color"
                            name="color"
                            type="color"
                            value={color}
                            onChange={onColorChange}
                        />
                        <Input
                            label="Client ID"
                            name="client_id"
                            type="text"
                            value={clientID}
                            onChange={onClientIDChange}
                        />
                        <Input
                            label="Client Secret"
                            name="client_secret"
                            placeholder="***"
                            type="password"
                            value={clientSecret}
                            onChange={onClientSecretChange}
                        />
                        <Input
                            label="Authorize URL"
                            name="authorize_url"
                            placeholder="https://..."
                            type="url"
                            value={authorizeURL}
                            onChange={onAuthorizeURLChange}
                        />
                        <Input
                            label="Access Token URL"
                            name="access_token_url"
                            placeholder="https://..."
                            type="url"
                            value={accessTokenURL}
                            onChange={onAccessTokenURLChange}
                        />
                        <Input
                            label="Redirect URL"
                            name="redirect_url"
                            placeholder="https://..."
                            type="url"
                            value={redirectURL}
                            onChange={onRedirectURLChange}
                        />
                    </Layout>
                    <Button onClick={save}>
                        <Text>OK</Text>
                        <Symbol symbol="done" />
                    </Button>
                </Layout>
            </Layout>
        </div>
    );
}

type Step = "database" | "oauth";

function ServerConfig() {
    const [loading, setLoading] = useState<boolean>(true);
    const [step, setStep] = useState<Step>("database");

    const navigate = useNavigate();

    const next = (): Step => {
        if (step === "database") {
            setStep("oauth");
            return;
        }
        navigate("/login");
    };

    const load = () => {
        axios({
            method: "GET",
            url: route(`/config/${step}`),
        })
            .then((res) => {
                if (res.data.already_done) {
                    next();
                } else {
                    setLoading(false);
                }
            })
            .catch(api.error);
    };

    useEffect(() => load(), [step]);
    if (loading) return <Text>Loading...</Text>;

    switch (step) {
        case "database":
            return <DatabaseConfig onDone={next} />;
        case "oauth":
            return <OAuthConfig onDone={next} />;
    }

    return null;
}

export default ServerConfig;
