import React from "react";
import NavBar from "Components/NavBar/NavBar";
import NavBarItem from "Components/NavBarItem/NavBarItem";

import Layout from "Components/Layout/Layout";

function StorageNavBar() {
    return (
        <NavBar title="Storage">
            <Layout vertical stretch gap={4}>
                <NavBarItem to="/storage/bucket" icon="storage">
                    My storage
                </NavBarItem>
                <NavBarItem to="/storage/recent" icon="schedule">
                    Recent
                </NavBarItem>
                <NavBarItem to="/storage/bin" icon="delete">
                    Bin
                </NavBarItem>
            </Layout>
        </NavBar>
    );
}

export default StorageNavBar;
