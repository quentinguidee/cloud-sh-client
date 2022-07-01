import React, { useEffect, useState } from "react";
import List from "Components/List/List";
import FileListItem from "Layouts/FileListItem/FileListItem";
import { File, FileType } from "Models/File";
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

function FileExplorer() {
    const session = useSession();
    const dispatch = useDispatch();

    const { "*": path } = useParams();
    const navigate = useNavigate();

    const [files, setFiles] = useState<File[]>([]);
    const [newFile, setNewFile] = useState<File | undefined>();

    const [renamingFile, setRenamingFile] = useState<File>();

    const loadFiles = () => {
        axios({
            url: route("/storage"),
            params: { path },
            headers: {
                Authorization: session.token,
            },
        })
            .then((res) => {
                console.table(res.data.files);
                setFiles(res.data.files);
            })
            .catch(api.error);
    };

    const createFile = (filetype: FileType) => {
        setNewFile({ filename: "", filetype });
    };

    const createFileCallback = (file?: File) => {
        setNewFile(undefined);

        if (!file) return;

        axios({
            method: "PUT",
            url: route("/storage"),
            data: {
                type: file.filetype,
                name: file.filename,
            },
            params: { path },
            headers: {
                Authorization: session.token,
            },
        })
            .then(() => loadFiles())
            .catch(api.error);
    };

    const downloadFile = (file: File) => {
        const filepath = `${path ?? ""}/${file.filename}`;
        axios({
            method: "GET",
            url: route("/storage/download"),
            params: {
                path: filepath,
            },
            headers: {
                Authorization: session.token,
            },
        })
            .then((res) => api.download(res, file.filename))
            .catch(api.error);
    };

    const renameFile = (file: File) => {
        setRenamingFile(file);
    };

    const renameFileCallback = (file: File, newFile: File) => {
        const filepath = `${path ?? ""}/${file.filename}`;
        setRenamingFile(undefined);
        axios({
            method: "PATCH",
            url: route("/storage"),
            params: {
                path: filepath,
                new_filename: newFile.filename,
            },
            headers: {
                Authorization: session.token,
            },
        })
            .then(() => loadFiles())
            .catch(api.error);
    };

    const openDirectory = (file: File) => {
        if (file.filetype !== "directory") {
            return;
        }
        let destination = `${path ?? ""}/${file.filename}`;
        if (destination[0] !== "/") destination = `/${destination}`;
        navigate(`/storage${destination}`);
    };

    const onDelete = (file: File) => {
        const filepath = `${path ?? ""}/${file.filename}`;
        axios({
            method: "DELETE",
            url: route("/storage"),
            params: { path: filepath },
            headers: {
                Authorization: session.token,
            },
        })
            .then(() => loadFiles())
            .catch(api.error);
    };

    useEffect(() => {
        loadFiles();
    }, [path]);

    useEffect(() => {
        const commands: Command[] = [
            {
                id: "create_file",
                icon: "article",
                name: "Create file",
                callback: () => createFile("file"),
                tooltip: "Create a blank file in the current directory",
            },
            {
                id: "create_folder",
                icon: "create_new_folder",
                name: "Create folder",
                callback: () => createFile("directory"),
                tooltip: "Create a new folder in the current directory",
            },
        ];

        commands.forEach((c) => dispatch(pushCommand(c)));
        return () => commands.forEach((c) => dispatch(removeCommand(c)));
    }, []);

    return (
        <React.Fragment>
            <Layout horizontal center gap={12}>
                <NewButton
                    createFile={() => createFile("file")}
                    createFolder={() => createFile("directory")}
                />
            </Layout>
            <List className={styles.explorer}>
                {newFile && (
                    <React.Fragment>
                        <FileListItem
                            editing
                            file={newFile}
                            onDelete={undefined}
                            onValidation={createFileCallback}
                        />
                        <Spacer height={12} />
                    </React.Fragment>
                )}
                {files?.map((file, i) => (
                    <FileListItem
                        key={i}
                        file={file}
                        editing={renamingFile === file}
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
