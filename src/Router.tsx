import Dashboard from "Pages/Dashboard/Dashboard";
import Login from "Pages/Login/Login";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Logout from "Pages/Logout/Logout";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/*" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
