import React, { Fragment, useEffect, useState } from "react";
import { useSession } from "Store/Hooks/useSession";
import { Node } from "Models/Node";
import axios from "axios";
import { api, route } from "Backend/api";
import TitleBar from "Layouts/TitleBar/TitleBar";
import FileExplorer from "Layouts/FileExplorer/FileExplorer";
import { Bucket } from "Models/Bucket";
import Toolbar from "Components/Toolbar/Toolbar";
import ToolbarItem from "Components/ToolbarItem/ToolbarItem";
import Spacer from "Components/Spacer/Spacer";
import Layout from "Components/Layout/Layout";

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

    const emptyBin = () => {
        axios({
            method: "DELETE",
            url: route(`/storage/${bucket.uuid}/bin`),
            headers: {
                Authorization: session.token,
            },
        })
            .then(() => reload())
            .catch(api.error);
    };

    return (
        <Fragment>
            <TitleBar title="Bin" />
            <Layout vertical gap={20}>
                <Toolbar>
                    <ToolbarItem
                        symbol="delete_forever"
                        text="Empty bin"
                        onClick={emptyBin}
                    />
                </Toolbar>
                <Spacer />
            </Layout>
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
