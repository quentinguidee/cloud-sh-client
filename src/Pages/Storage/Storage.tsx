import React from "react";
import Page from "Layouts/Page/Page";
import FileExplorer from "Layouts/FileExplorer/FileExplorer";
import Uploads from "Components/Uploads/Uploads";
import StorageNavBar from "Layouts/StorageNavBar/StorageNavBar";
import { Navigate, Route, Routes } from "react-router-dom";

function Storage() {
    return (
        <React.Fragment>
            <StorageNavBar />
            <Page>
                <Routes>
                    <Route path="bucket/*" element={<FileExplorer />} />
                    <Route path="*" element={<Navigate to="bucket" />} />
                </Routes>
            </Page>
            <Uploads />
        </React.Fragment>
    );
}

export default Storage;
