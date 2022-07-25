import React, { useEffect, useState } from "react";
import Page from "Layouts/Page/Page";
import Uploads from "Components/Uploads/Uploads";
import StorageNavBar from "Pages/Storage/StorageNavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import StorageBucket from "Pages/Storage/Categories/StorageBucket";
import StorageRecent from "Pages/Storage/Categories/StorageRecent";
import StorageBin from "Pages/Storage/Categories/StorageBin";
import axios from "axios";
import { api, route } from "Backend/api";
import { useSession } from "Store/Hooks/useSession";
import { Bucket } from "Models/Bucket";

function Storage() {
    const session = useSession();

    const [bucket, setBucket] = useState<Bucket>();

    useEffect(() => {
        axios({
            method: "GET",
            url: route("/storage/bucket"),
            headers: {
                Authorization: session.token,
            },
        })
            .then((res) => {
                setBucket(res.data);
            })
            .catch(api.error);
    }, []);

    if (!bucket) return null;

    return (
        <React.Fragment>
            <StorageNavBar bucket={bucket} />
            <Page>
                <Routes>
                    <Route
                        path="bucket/*"
                        element={<StorageBucket bucket={bucket} />}
                    />
                    <Route
                        path="recent/*"
                        element={<StorageRecent bucket={bucket} />}
                    />
                    <Route
                        path="bin/*"
                        element={<StorageBin bucket={bucket} />}
                    />
                    <Route path="*" element={<Navigate to="bucket" />} />
                </Routes>
            </Page>
            <Uploads />
        </React.Fragment>
    );
}

export default Storage;
