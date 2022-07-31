import React, { useEffect } from "react";
import Storage from "Pages/Storage/Storage";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "Components/Layout/Layout";

import CommandPrompt from "Components/CommandPrompt/CommandPrompt";
import { useDispatch } from "react-redux";
import { Command } from "Models/Command";
import { pushCommand, removeCommand } from "Store/Slices/CommandsSlice";
import { useToken } from "Store/Hooks/useToken";
import Admin from "Pages/Admin/Admin";
import Apps from "Components/Apps/Apps";
import Welcome from "Pages/Welcome/Welcome";
import { useUser } from "Store/Hooks/useUser";
import Settings from "Pages/Settings/Settings";
import { App } from "Models/App";
import { pushApp, removeApp } from "Store/Slices/AppsSlice";

function Dashboard() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const token = useToken();
    const user = useUser();

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
        const apps: App[] = [
            {
                id: "storage",
                name: "Storage",
                symbol: "cloud",
            },
            {
                id: "settings",
                name: "Settings",
                symbol: "settings",
                position: "settings",
            },
        ];

        apps?.forEach((app) => dispatch(pushApp(app)));
        return () => apps?.forEach((app) => dispatch(removeApp(app)));
    }, []);

    useEffect(() => {
        if (user?.role !== "admin") return () => {};

        const app: App = {
            id: "admin",
            name: "Admin panel",
            symbol: "admin_panel_settings",
            position: "settings",
        };
        dispatch(pushApp(app));
        return () => dispatch(removeApp(app));
    }, [user]);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            window.location.reload();
        }
    });

    return (
        <React.Fragment>
            <Layout horizontal stretch>
                <Apps />
                <Routes>
                    <Route path="storage/*" element={<Storage />} />
                    <Route path="settings/*" element={<Settings />} />
                    {user?.role === "admin" && (
                        <Route path="admin/*" element={<Admin />} />
                    )}
                    <Route path="*" element={<Welcome />} />
                </Routes>
            </Layout>
            <CommandPrompt />
        </React.Fragment>
    );
}

export default Dashboard;
