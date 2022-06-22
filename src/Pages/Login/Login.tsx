import React from "react";

import Button from "Components/Button/Button";
import Symbol from "Components/Icon/Symbol";
import Layout from "Components/Layout/Layout";
import { Title } from "Components/Title/Title";

import styles from "./Login.module.sass";
import { get } from "Backend/api";

function Login() {
    const loginWithGithub = async () => {
        const [res, err] = await get("/auth/github/login");
        if (err) {
            return console.error(err);
        }
        window.location = res.data.url;
    };

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
