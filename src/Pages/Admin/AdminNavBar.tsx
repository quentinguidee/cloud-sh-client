import React from "react";

import NavBar from "Components/NavBar/NavBar";
import Layout from "Components/Layout/Layout";
import NavBarItem from "Components/NavBarItem/NavBarItem";

function AdminNavBar() {
    return (
        <NavBar title="Admin panel">
            <Layout vertical stretch gap={4}>
                <NavBarItem to="/admin/demo" icon="science">
                    Demo mode
                </NavBarItem>
                <NavBarItem to="/admin/reset" icon="restart_alt">
                    Reset
                </NavBarItem>
            </Layout>
        </NavBar>
    );
}

export default AdminNavBar;
