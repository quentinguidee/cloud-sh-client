import React, { Fragment, useEffect, useState } from "react";
import FileExplorer from "Layouts/FileExplorer/FileExplorer";
import TitleBar from "Layouts/TitleBar/TitleBar";
import axios from "axios";
import { api, route } from "Backend/api";
import { useSession } from "Store/Hooks/useSession";
import { Node } from "Models/Node";
import { Bucket } from "Models/Bucket";

type Props = {
    bucket: Bucket;
};

function StorageRecent(props: Props) {
    const { bucket } = props;

    const session = useSession();

    const [nodes, setNodes] = useState<Node[]>([]);

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        axios({
            url: route(`/storage/${bucket.uuid}/recent`),
            headers: {
                Authorization: session.token,
            },
        })
            .then((res) => {
                console.table(res.data.nodes);
                setNodes(res.data.nodes);
            })
            .catch(api.error);
    };

    return (
        <Fragment>
            <TitleBar title="Recent" />
            <FileExplorer
                bucket={bucket}
                nodes={nodes}
                onReload={reload}
                ifEmptyMessage="No recent files found."
            />
        </Fragment>
    );
}

export default StorageRecent;
