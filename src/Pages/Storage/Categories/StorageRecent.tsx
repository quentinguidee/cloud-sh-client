import React, { Fragment, useEffect, useState } from "react";
import FileExplorer from "Layouts/FileExplorer/FileExplorer";
import TitleBar from "Layouts/TitleBar/TitleBar";
import axios from "axios";
import { api, route } from "Backend/api";
import { useToken } from "Store/Hooks/useToken";
import { Node } from "Models/Node";
import { Bucket } from "Models/Bucket";

type Props = {
    bucket: Bucket;
};

function StorageRecent(props: Props) {
    const { bucket } = props;

    const token = useToken();

    const [nodes, setNodes] = useState<Node[]>([]);

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        axios({
            url: route(`/storage/recent`),
            params: {
                bucket_uuid: bucket.uuid,
            },
            headers: {
                Authorization: token,
            },
        })
            .then((res) => {
                console.table(res.data);
                setNodes(res.data);
            })
            .catch(api.error);
    };

    return (
        <Fragment>
            <TitleBar title="Recent" />
            <FileExplorer
                nodes={nodes}
                onReload={reload}
                ifEmptyMessage="No recent files found."
            />
        </Fragment>
    );
}

export default StorageRecent;
