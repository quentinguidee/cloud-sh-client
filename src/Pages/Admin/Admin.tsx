import React from "react";
import Page from "Layouts/Page/Page";
import AdminNavBar from "Pages/Admin/AdminNavBar";
import { Route, Routes } from "react-router-dom";
import AdminDemoMode from "Pages/Admin/Categories/AdminDemoMode";

function Admin() {
    return (
        <React.Fragment>
            <AdminNavBar />
            <Page>
                <Routes>
                    <Route path="demo/*" element={<AdminDemoMode />} />
                </Routes>
            </Page>
        </React.Fragment>
    );
}

export default Admin;
