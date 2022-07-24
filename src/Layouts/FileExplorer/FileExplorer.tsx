import React, { useState } from "react";
import List from "Components/List/List";
import FileListItem from "Layouts/FileListItem/FileListItem";
import { Node } from "Models/Node";
import { api, route } from "Backend/api";
import { useSession } from "Store/Hooks/useSession";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./FileExplorer.module.sass";
import classNames from "classnames";
import NodeInfo from "Components/NodeInfo/NodeInfo";
import NodePreviewPopover from "Components/NodePreviewPopover/NodePreviewPopover";

type Props = {
    nodes?: Node[];

    onReload: () => void;
    onDrop?: (e) => void;

    // When false/undefined, deleting a node only moves it to the bin.
    hardDelete?: boolean;

    disableNavigation?: boolean;
};

function FileExplorer(props: Props) {
    const { nodes, onReload, hardDelete, disableNavigation } = props;

    const session = useSession();

    const navigate = useNavigate();

    const [dragAndDrop, setDragAndDrop] = useState<boolean>(false);

    const [renamingNode, setRenamingNode] = useState<Node>();

    const [infoNode, setInfoNode] = useState<Node>(undefined);
    const [previewNode, setPreviewNode] = useState<Node>(undefined);

    const downloadNode = (node: Node) => {
        if (disableNavigation) return;
        axios({
            method: "GET",
            url: route("/storage/download"),
            params: {
                node_uuid: node.uuid,
            },
            headers: {
                Authorization: session.token,
            },
            responseType: "blob",
        })
            .then((res) => api.download(res, node.name))
            .catch(api.error);
    };

    const renameNode = (node: Node) => {
        setRenamingNode(node);
    };

    const renameNodeCallback = (node: Node, newNode: Node) => {
        setRenamingNode(undefined);
        axios({
            method: "PATCH",
            url: route("/storage"),
            params: {
                node_uuid: node.uuid,
                new_name: newNode.name,
            },
            headers: {
                Authorization: session.token,
            },
        })
            .then(() => onReload())
            .catch(api.error);
    };

    const open = (node: Node) => {
        if (disableNavigation) return;
        if (node.type !== "directory") {
            setPreviewNode(node);
            return;
        }
        navigate(node.uuid);
    };

    const onDelete = (node: Node) => {
        axios({
            method: "DELETE",
            url: route("/storage"),
            params: {
                node_uuid: node.uuid,
                soft_delete: hardDelete !== undefined ? !hardDelete : true,
            },
            headers: {
                Authorization: session.token,
            },
        })
            .then(() => onReload())
            .catch(api.error);
    };

    const onDragOver = (e) => {
        if (!props.onDrop) return;

        e.preventDefault();
        e.stopPropagation();
        setDragAndDrop(true);
    };

    const onDragExit = (e) => {
        if (!props.onDrop) return;

        e.preventDefault();
        e.stopPropagation();
        setDragAndDrop(false);
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        if (!props.onDrop) return;

        e.preventDefault();
        e.stopPropagation();
        setDragAndDrop(false);
        props.onDrop(e);
    };

    return (
        <React.Fragment>
            <List
                onDragOver={onDragOver}
                onDragExit={onDragExit}
                onDrop={onDrop}
                className={classNames({
                    [styles.explorer]: true,
                    [styles.dragAndDrop]: dragAndDrop,
                })}
            >
                {nodes?.map((node, i) => (
                    <FileListItem
                        key={i}
                        node={node}
                        editing={renamingNode === node}
                        onClick={() => open(node)}
                        onPreview={() => setPreviewNode(node)}
                        onShowInfo={() => setInfoNode(node)}
                        onDownload={() => downloadNode(node)}
                        onRename={() => renameNode(node)}
                        onValidation={(newNode) =>
                            renameNodeCallback(node, newNode)
                        }
                        onDelete={() => onDelete(node)}
                    />
                ))}
            </List>
            <NodeInfo node={infoNode} onClose={() => setInfoNode(undefined)} />
            <NodePreviewPopover
                node={previewNode}
                onClose={() => setPreviewNode(undefined)}
            />
        </React.Fragment>
    );
}

export default FileExplorer;
