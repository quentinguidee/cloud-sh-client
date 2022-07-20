import React, { Fragment, useEffect, useState } from "react";
import FileExplorer from "Layouts/FileExplorer/FileExplorer";
import TitleBar from "Layouts/TitleBar/TitleBar";
import axios from "axios";
import { api, route } from "Backend/api";
import { useSession } from "Store/Hooks/useSession";
import { Node } from "Models/Node";

function StorageRecent() {
    const session = useSession();

    const [nodes, setNodes] = useState<Node[]>([]);

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        axios({
            url: route("/storage/recent"),
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
            <FileExplorer nodes={nodes} onReload={reload} />
        </Fragment>
    );
}

export default StorageRecent;
