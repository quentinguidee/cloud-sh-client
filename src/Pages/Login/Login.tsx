import React, { useEffect, useState } from "react";

import Button from "Components/Button/Button";
import Symbol from "Components/Icon/Symbol";
import Layout from "Components/Layout/Layout";
import { Subtitle, Title } from "Components/Title/Title";

import styles from "./Login.module.sass";
import { get, post } from "Backend/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSession, setUser } from "Store/Slices/AuthSlice";
import Box from "Components/Box/Box";

function Login() {
    const [params] = useSearchParams();

    const dispatch = useDispatch();

    const [code, setCode] = useState<string | undefined>();
    const [state, setState] = useState<string | undefined>();

    const [error, setError] = useState<string | undefined>();
    const [loading, setLoading] = useState<string | undefined>();

    const navigate = useNavigate();

    const loginWithGithub = () => {
        setLoading("Redirecting to Github...");
        setError(undefined);
        get("/auth/github/login")
            .then((res) => {
                window.location = res.data.url;
            })
            .catch((err) => {
                console.error(err);
                setError(
                    err?.response?.data?.message ??
                        err.message ??
                        err.toString(),
                );
                setLoading(undefined);
            });
    };

    const callbackGithub = async () => {
        setLoading("Authenticating...");
        post("/auth/github/callback", {
            code,
            state,
        })
            .then((res) => {
                dispatch(setUser(res.data.user));
                dispatch(setSession(res.data.session));

                console.log("Logged in successfully");
                navigate("/");
            })
            .catch((err) => {
                console.error(err.response);
                setError(
                    err?.response?.data?.message ??
                        err.message ??
                        err.toString(),
                );
                setLoading(undefined);
            });
    };

    useEffect(() => {
        setCode(params.get("code"));
        setState(params.get("state"));
    }, [params]);

    useEffect(() => {
        if (!code || !state) return;
        callbackGithub().then(console.log);
    }, [code, state]);

    return (
        <div className={styles.content}>
            <Layout vertical className={styles.login} gap={24}>
                {!loading && (
                    <Box>
                        <Layout vertical gap={24}>
                            <Title>Login</Title>
                            <Button
                                onClick={loginWithGithub}
                                className={styles.github}
                            >
                                <Symbol symbol="login" />
                                Login with GitHub
                            </Button>
                        </Layout>
                    </Box>
                )}
                {loading && <Box type="info">{loading}</Box>}
                {error && (
                    <Box type="error">
                        <Layout vertical gap={12}>
                            <Subtitle>Error</Subtitle>
                            {error}
                        </Layout>
                    </Box>
                )}
            </Layout>
        </div>
    );
}

export default Login;
