import React from "react";
import NavigationBar from "Layouts/NavigationBar/NavigationBar";
import Drive from "Pages/Drive/Drive";
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
                    <Route path="drive" element={<Drive />} />
                </Routes>
            </div>
        </Layout>
    );
}

export default Dashboard;
