import React from "react";
import NavigationBar from "Layouts/NavigationBar/NavigationBar";
import Storage from "Pages/Storage/Storage";
import { Route, Routes } from "react-router-dom";
import Layout from "Components/Layout/Layout";

import styles from "./Dashboard.module.sass";
import { useMessages } from "Store/Hooks/useMessages";
import MessageBoxStack from "Components/MessageBoxStack/MessageBoxStack";
import CommandPrompt from "Components/CommandPrompt/CommandPrompt";

function Dashboard() {
    const messages = useMessages();

    return (
        <React.Fragment>
            <Layout horizontal stretch>
                <div>
                    <NavigationBar />
                </div>
                <div className={styles.content}>
                    <Routes>
                        <Route path="storage/*" element={<Storage />} />
                    </Routes>
                </div>
            </Layout>
            <MessageBoxStack messages={messages} />
            <CommandPrompt />
        </React.Fragment>
    );
}

export default Dashboard;
