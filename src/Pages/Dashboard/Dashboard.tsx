import React, { useEffect } from "react";
import NavigationBar from "Layouts/NavigationBar/NavigationBar";
import Storage from "Pages/Storage/Storage";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "Components/Layout/Layout";

import styles from "./Dashboard.module.sass";
import { useMessages } from "Store/Hooks/useMessages";
import MessageBoxStack from "Components/MessageBoxStack/MessageBoxStack";
import CommandPrompt from "Components/CommandPrompt/CommandPrompt";
import { useDispatch } from "react-redux";
import { Command } from "Models/Command";
import { pushCommand, removeCommand } from "Store/Slices/CommandsSlice";
import { useSession } from "Store/Hooks/useSession";

function Dashboard() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const messages = useMessages();
    const session = useSession();

    useEffect(() => {
        const commands: Command[] = [
            {
                id: "logout",
                icon: "logout",
                name: "Logout",
                callback: () => navigate("/logout"),
                tooltip: "Close your active session.",
            },
        ];

        commands.forEach((c) => dispatch(pushCommand(c)));
        return () => commands.forEach((c) => dispatch(removeCommand(c)));
    }, []);

    useEffect(() => {
        if (!session) {
            navigate("/login");
            window.location.reload();
        }
    });

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
