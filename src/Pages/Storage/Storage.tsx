import React from "react";
import Page from "Layouts/Page/Page";
import Uploads from "Components/Uploads/Uploads";
import StorageNavBar from "Pages/Storage/StorageNavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import StorageBucket from "Pages/Storage/Categories/StorageBucket";
import StorageRecent from "Pages/Storage/Categories/StorageRecent";
import StorageBin from "Pages/Storage/Categories/StorageBin";

function Storage() {
    return (
        <React.Fragment>
            <StorageNavBar />
            <Page>
                <Routes>
                    <Route path="bucket/*" element={<StorageBucket />} />
                    <Route path="recent/*" element={<StorageRecent />} />
                    <Route path="bin/*" element={<StorageBin />} />
                    <Route path="*" element={<Navigate to="bucket" />} />
                </Routes>
            </Page>
            <Uploads />
        </React.Fragment>
    );
}

export default Storage;
