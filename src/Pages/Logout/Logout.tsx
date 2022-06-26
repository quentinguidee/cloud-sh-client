import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "Store/Hooks/useSession";
import axios from "axios";
import { route } from "Backend/api";
import Box from "Components/Box/Box";
import styles from "./Logout.module.sass";
import Layout from "Components/Layout/Layout";
import { Subtitle } from "Components/Title/Title";

function Logout() {
    const navigate = useNavigate();

    const session = useSession();

    const logout = async () => {
        axios
            .post(route("/auth/logout"), { ...session })
            .then(() => navigate("/login"))
            .catch(console.error);
    };

    useEffect(() => {
        logout().then(undefined);
    }, []);

    return(
        <div className={styles.content}>
            <Layout vertical className={styles.logout}>
                    <Box>
                            <Subtitle>Disconnecting ...</Subtitle>
                    </Box>
            </Layout>
        </div>
    );
}

export default Logout;
