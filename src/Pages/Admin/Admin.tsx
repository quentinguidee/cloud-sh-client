import React from "react";
import Page from "Layouts/Page/Page";
import AdminNavBar from "Pages/Admin/AdminNavBar";
import { Route, Routes } from "react-router-dom";
import AdminDemoMode from "Pages/Admin/Categories/AdminDemoMode";
import AdminReset from "Pages/Admin/Categories/AdminReset";
import AdminUpdates from "Pages/Admin/Categories/AdminUpdates";
import AdminUsers from "Pages/Admin/Categories/AdminUsers";
import AdminAuth from "Pages/Admin/Categories/AdminAuth";

function Admin() {
    return (
        <React.Fragment>
            <AdminNavBar />
            <Page>
                <Routes>
                    <Route path="auth/*" element={<AdminAuth />} />
                    <Route path="users/*" element={<AdminUsers />} />
                    <Route path="updates/*" element={<AdminUpdates />} />
                    <Route path="demo/*" element={<AdminDemoMode />} />
                    <Route path="reset/*" element={<AdminReset />} />
                </Routes>
            </Page>
        </React.Fragment>
    );
}

export default Admin;
