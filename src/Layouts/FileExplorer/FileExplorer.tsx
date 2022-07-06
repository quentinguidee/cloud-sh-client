import React, { useEffect, useState } from "react";
import List from "Components/List/List";
import FileListItem from "Layouts/FileListItem/FileListItem";
import { Node, NodeType } from "Models/Node";
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
import { pushMessage } from "Store/Slices/MessagesSlice";

function FileExplorer() {
    const session = useSession();
    const dispatch = useDispatch();

    const { "*": uuid } = useParams();
    const navigate = useNavigate();

    const [nodes, setNodes] = useState<Node[]>([]);
    const [newNode, setNewNode] = useState<Node | undefined>();

    const [renamingNode, setRenamingNode] = useState<Node>();
    const [openFileSelector, { filesContent }] = useFilePicker({
        multiple: true,
    });

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

    const createFile = (type: NodeType) => {
        setNewNode({ name: "", type });
    };

    const importFile = () => {
        openFileSelector();
    };

    const uploadFile = (node: Node, content: string) => {
        axios({
            method: "PUT",
            url: route("/storage/upload"),
            params: { parent_uuid: uuid },
            data: {
                type: node.type,
                name: node.name,
                content,
            },
            headers: {
                Authorization: session.token,
            },
        })
            .then(() => loadFiles())
            .catch(api.error);
    };

    useEffect(() => {
        filesContent.forEach((file) => {
            uploadFile(
                {
                    type: "file",
                    name: file.name,
                },
                file.content,
            );
        });
    }, [filesContent]);

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
                console.log(res);
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
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const { files } = e.dataTransfer;

        if (files) {
            Array.from(files).forEach((file) => {
                console.log(file);
                const reader = new FileReader();
                reader.readAsText(file);
                reader.onload = () => {
                    const content = reader.result;
                    uploadFile(
                        {
                            type: "file",
                            name: file.name,
                        },
                        content as string,
                    );
                };
                reader.onerror = () => {
                    dispatch(
                        pushMessage({
                            type: "error",
                            message: reader.error.toString(),
                        }),
                    );
                };
            });
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
                onDrop={onDrop}
                className={styles.explorer}
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
                        onDownload={() => downloadFile(file)}
                        onRename={() => renameFile(file)}
                        onValidation={(newFile) =>
                            renameFileCallback(file, newFile)
                        }
                        onDelete={() => onDelete(file)}
                    />
                ))}
            </List>
        </React.Fragment>
    );
}

export default FileExplorer;
