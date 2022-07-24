import React, { Fragment, useEffect, useState } from "react";
import { useSession } from "Store/Hooks/useSession";
import { Node } from "Models/Node";
import axios from "axios";
import { api, route } from "Backend/api";
import TitleBar from "Layouts/TitleBar/TitleBar";
import FileExplorer from "Layouts/FileExplorer/FileExplorer";

function StorageBin() {
    const session = useSession();

    const [nodes, setNodes] = useState<Node[]>([]);

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        axios({
            url: route("/storage/bin"),
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
            <TitleBar title="Bin" />
            <FileExplorer
                nodes={nodes}
                onReload={reload}
                hardDelete
                disableNavigation
                ifEmptyMessage="The bin is empty."
            />
        </Fragment>
    );
}

export default StorageBin;
