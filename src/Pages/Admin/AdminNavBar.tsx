import React from "react";

import NavBar from "Components/NavBar/NavBar";
import Layout from "Components/Layout/Layout";
import NavBarItem from "Components/NavBarItem/NavBarItem";
import Separator from "Components/Separator/Separator";
import NavBarSection from "Components/NavBarSection/NavBarSection";

function AdminNavBar() {
    return (
        <NavBar title="Admin panel">
            <Layout vertical stretch gap={4}>
                <NavBarSection title="General">
                    <NavBarItem to="/admin/updates" icon="update">
                        Updates
                    </NavBarItem>
                </NavBarSection>
                <Separator />
                <NavBarSection title="Danger zone">
                    <NavBarItem to="/admin/demo" icon="science">
                        Demo mode
                    </NavBarItem>
                    <NavBarItem to="/admin/reset" icon="restart_alt">
                        Reset
                    </NavBarItem>
                </NavBarSection>
            </Layout>
        </NavBar>
    );
}

export default AdminNavBar;
