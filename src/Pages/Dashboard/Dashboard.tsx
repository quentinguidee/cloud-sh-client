import React from "react";
import NavigationBar from "Layouts/NavigationBar/NavigationBar";
import Storage from "Pages/Storage/Storage";
import { Route, Routes } from "react-router-dom";
import Layout from "Components/Layout/Layout";

import styles from "./Dashboard.module.sass";

function Dashboard() {
    return (
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
    );
}

export default Dashboard;
