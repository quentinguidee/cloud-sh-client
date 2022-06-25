import React, { useEffect, useState } from "react";

import Button from "Components/Button/Button";
import Symbol from "Components/Icon/Symbol";
import Layout from "Components/Layout/Layout";
import { Title } from "Components/Title/Title";

import styles from "./Login.module.sass";
import { get, post } from "Backend/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSession, setUser } from "Store/Slices/AuthSlice";

function Login() {
    const [params] = useSearchParams();

    const dispatch = useDispatch();

    const [code, setCode] = useState<string | undefined>();
    const [state, setState] = useState<string | undefined>();

    const navigate = useNavigate();

    const loginWithGithub = async () => {
        const [res, err] = await get("/auth/github/login");
        if (err) {
            return console.error(err);
        }
        window.location = res.data.url;
    };

    const callbackGithub = async () => {
        const [res, err] = await post("/auth/github/callback", {
            code,
            state,
        });
        if (err) {
            console.error(err);
            return;
        }

        dispatch(setUser(res.data.user));
        dispatch(setSession(res.data.session));

        console.log("Logged in successfully");
        navigate("/");
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
                <Title>Login</Title>
                <Button onClick={loginWithGithub} className={styles.github}>
                    <Symbol symbol="login" />
                    Login with GitHub
                </Button>
            </Layout>
        </div>
    );
}

export default Login;
