import React, { Fragment } from "react";
import NavigationBar from "Layouts/NavigationBar/NavigationBar";
import Drive from "Pages/Drive/Drive";
import { Route, Routes } from "react-router-dom";

function Dashboard() {
    return (
        <Fragment>
            <Routes>
                <Route path="drive" element={<Drive />} />
            </Routes>

            <div>
                <NavigationBar />
            </div>
        </Fragment>
    );
}

export default Dashboard;
