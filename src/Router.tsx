import Dashboard from "Pages/Dashboard/Dashboard";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
