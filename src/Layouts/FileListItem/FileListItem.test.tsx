import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import FileListItem from "./FileListItem";
import { File } from "Models/File";
import fn = jest.fn;

const file: File = {
    filename: "Fichier.txt",
    filetype: "file",
};

it("renders", async () => {
    const { getByText } = render(
        <FileListItem file={file} onDelete={() => {}} />,
    );

    expect(getByText(file.filename)).toBeInTheDocument();
});

it("triggers delete action", async () => {
    const onDelete = fn();
    const { getByText } = render(
        <FileListItem file={file} onDelete={onDelete} />,
    );

    fireEvent.contextMenu(getByText("Fichier.txt"));
    fireEvent.click(getByText("Delete"));

    expect(onDelete).toHaveBeenCalled();
});
