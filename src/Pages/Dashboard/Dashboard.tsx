import React, { useState } from "react";
import NavigationBar from "Layouts/NavigationBar/NavigationBar";
import Storage from "Pages/Storage/Storage";
import { Route, Routes } from "react-router-dom";
import Layout from "Components/Layout/Layout";
import CommandPrompt from "Components/CommandPrompt/CommandPrompt";

import styles from "./Dashboard.module.sass";
import User from "Models/User";

function Dashboard() {
    const [account, _] = useState<User | undefined>();

    // const loadUser = async (username) => {
    //     const [res, err] = await get(`/auth/user/${username}`);
    //     if (err) {
    //         return console.error(err);
    //     }
    //     console.log(res.data);
    //     setAccount(res.data);
    // };

    return (
        <>
            <CommandPrompt />
            <Layout horizontal stretch>
                <div>
                    <NavigationBar />
                </div>

                <div className={styles.content}>
                    <Routes>
                        <Route
                            path="storage"
                            element={<Storage account={account} />}
                        />
                    </Routes>
                </div>
            </Layout>
        </>
    );
}

export default Dashboard;
