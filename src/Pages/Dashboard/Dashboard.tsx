import NavBar from "Components/NavBar/NavBar";
import Drive from "Pages/Drive/Drive";
import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

function Dashboard() {
    return (
        <Fragment>
            <Routes>
                <Route path="drive" element={<Drive />} />
            </Routes>

            <div>
                <NavBar />
            </div>
        </Fragment>
    );
}

export default Dashboard;
