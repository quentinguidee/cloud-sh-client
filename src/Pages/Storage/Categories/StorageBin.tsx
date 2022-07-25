import React, { Fragment, useEffect, useState } from "react";
import { useSession } from "Store/Hooks/useSession";
import { Node } from "Models/Node";
import axios from "axios";
import { api, route } from "Backend/api";
import TitleBar from "Layouts/TitleBar/TitleBar";
import FileExplorer from "Layouts/FileExplorer/FileExplorer";
import { Bucket } from "Models/Bucket";

type Props = {
    bucket: Bucket;
};

function StorageBin(props: Props) {
    const session = useSession();

    const { bucket } = props;

    const [nodes, setNodes] = useState<Node[]>([]);

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        axios({
            url: route(`/storage/${bucket.uuid}/bin`),
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
                bucket={bucket}
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
