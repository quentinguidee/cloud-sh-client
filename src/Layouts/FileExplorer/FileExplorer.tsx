import React, { useEffect, useState } from "react";
import List from "Components/List/List";
import FileListItem from "Layouts/FileListItem/FileListItem";
import { Node, NodeUpload } from "Models/Node";
import { api, route } from "Backend/api";
import { useSession } from "Store/Hooks/useSession";
import axios from "axios";
import Layout from "Components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./FileExplorer.module.sass";
import NewButton from "Layouts/NewButton/NewButton";
import Spacer from "Components/Spacer/Spacer";
import { Command } from "Models/Command";
import { pushCommand, removeCommand } from "Store/Slices/CommandsSlice";
import { useDispatch } from "react-redux";
import { useFilePicker } from "use-file-picker";
import classNames from "classnames";
import { pushUpload, updateUpload } from "Store/Slices/UploadsSlice";
import NodeInfo from "Components/NodeInfo/NodeInfo";
import NodePreview from "Components/NodePreview/NodePreview";

function FileExplorer() {
    const session = useSession();
    const dispatch = useDispatch();

    const { "*": uuid } = useParams();
    const navigate = useNavigate();

    const [nodes, setNodes] = useState<Node[]>([]);
    const [newNode, setNewNode] = useState<Node | undefined>();
    const [dragAndDrop, setDragAndDrop] = useState<boolean>(false);

    const [renamingNode, setRenamingNode] = useState<Node>();
    const [openFileSelector, { plainFiles }] = useFilePicker({
        multiple: true,
    });

    const [infoNode, setInfoNode] = useState<Node>(undefined);
    const [previewNode, setPreviewNode] = useState<Node>(undefined);

    const loadFiles = () => {
        axios({
            url: route("/storage"),
            params: { parent_uuid: uuid },
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

    const createFile = (type: string) => {
        setNewNode({ name: "", type });
    };

    const importFile = () => {
        openFileSelector();
    };

    const uploadFile = (file: File) => {
        const node: NodeUpload = {
            name: file.name,
            type: "file",
            percentage: 0,
        };

        dispatch(pushUpload(node));

        const data = new FormData();
        data.append("file", file);
        axios({
            method: "POST",
            url: route("/storage/upload"),
            params: { parent_uuid: uuid },
            data: data,
            headers: {
                Authorization: session.token,
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progress) => {
                const percentage = Math.ceil(
                    (progress.loaded / progress.total) * 100,
                );
                dispatch(updateUpload({ node, changes: { percentage } }));
            },
        })
            .then(() => {
                loadFiles();
                dispatch(
                    updateUpload({
                        node,
                        changes: { percentage: 100, status: "done" },
                    }),
                );
            })
            .catch((e) => {
                api.error(e);
                dispatch(
                    updateUpload({
                        node,
                        changes: { percentage: 100, status: "error" },
                    }),
                );
            });
    };

    useEffect(() => {
        plainFiles.forEach(uploadFile);
    }, [plainFiles]);

    const createFileCallback = (node?: Node) => {
        setNewNode(undefined);

        if (!node) return;

        axios({
            method: "PUT",
            url: route("/storage"),
            data: {
                type: node.type,
                name: node.name,
            },
            params: { parent_uuid: uuid },
            headers: {
                Authorization: session.token,
            },
        })
            .then(() => loadFiles())
            .catch(api.error);
    };

    const downloadFile = (node: Node) => {
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

    const renameFile = (node: Node) => {
        setRenamingNode(node);
    };

    const renameFileCallback = (node: Node, newNode: Node) => {
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
            .then(() => loadFiles())
            .catch(api.error);
    };

    const openDirectory = (node: Node) => {
        if (node.type !== "directory") {
            return;
        }
        navigate(node.uuid);
    };

    const onDelete = (node: Node) => {
        axios({
            method: "DELETE",
            url: route("/storage"),
            params: { node_uuid: node.uuid },
            headers: {
                Authorization: session.token,
            },
        })
            .then(() => loadFiles())
            .catch(api.error);
    };

    useEffect(() => {
        if (uuid && uuid.length > 0) {
            loadFiles();
            return;
        }

        axios({
            method: "GET",
            url: route("/storage/bucket"),
            headers: {
                Authorization: session.token,
            },
        })
            .then((res) => {
                const { root_node } = res.data;
                navigate(root_node);
            })
            .catch(api.error);
    }, [uuid]);

    useEffect(() => {
        const commands: Command[] = [
            {
                id: "create_file",
                icon: "article",
                name: "Create file",
                callback: () => createFile("file"),
                tooltip: "Create a blank file in the current directory.",
            },
            {
                id: "create_folder",
                icon: "create_new_folder",
                name: "Create folder",
                callback: () => createFile("directory"),
                tooltip: "Create a new folder in the current directory.",
            },
            {
                id: "import_files",
                icon: "file_upload",
                name: "Import files",
                callback: () => importFile(),
                tooltip:
                    "Import a new file or folder in the current directory.",
            },
        ];

        commands.forEach((c) => dispatch(pushCommand(c)));
        return () => commands.forEach((c) => dispatch(removeCommand(c)));
    }, []);

    const onDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragAndDrop(true);
    };

    const onDragExit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragAndDrop(false);
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragAndDrop(false);

        const { files } = e.dataTransfer;

        if (files) {
            Array.from(files).forEach(uploadFile);
        }
    };

    return (
        <React.Fragment>
            <Layout horizontal center gap={12}>
                <NewButton
                    createFile={() => createFile("file")}
                    createFolder={() => createFile("directory")}
                    importFile={() => importFile()}
                />
            </Layout>
            <List
                onDragOver={onDragOver}
                onDragExit={onDragExit}
                onDrop={onDrop}
                className={classNames({
                    [styles.explorer]: true,
                    [styles.dragAndDrop]: dragAndDrop,
                })}
            >
                {newNode && (
                    <React.Fragment>
                        <FileListItem
                            editing
                            node={newNode}
                            onDelete={undefined}
                            onValidation={createFileCallback}
                        />
                        <Spacer height={12} />
                    </React.Fragment>
                )}
                {nodes?.map((file, i) => (
                    <FileListItem
                        key={i}
                        node={file}
                        editing={renamingNode === file}
                        onClick={() => openDirectory(file)}
                        onPreview={() => setPreviewNode(file)}
                        onShowInfo={() => setInfoNode(file)}
                        onDownload={() => downloadFile(file)}
                        onRename={() => renameFile(file)}
                        onValidation={(newFile) =>
                            renameFileCallback(file, newFile)
                        }
                        onDelete={() => onDelete(file)}
                    />
                ))}
            </List>
            <NodeInfo node={infoNode} onClose={() => setInfoNode(undefined)} />
            <NodePreview
                node={previewNode}
                onClose={() => setPreviewNode(undefined)}
            />
        </React.Fragment>
    );
}

export default FileExplorer;
