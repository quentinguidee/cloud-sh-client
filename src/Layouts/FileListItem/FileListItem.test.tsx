import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import FileListItem from "./FileListItem";
import { Node } from "Models/Node";
import fn = jest.fn;

const node: Node = {
    name: "Fichier.txt",
    type: "file",
    mime: "text/plain",
};

it("renders", async () => {
    const { getByText } = render(<FileListItem node={node} />);

    expect(getByText(node.name)).toBeInTheDocument();
});

it("triggers delete action", async () => {
    const onDelete = fn();
    const { getByText } = render(
        <FileListItem node={node} onDelete={onDelete} />,
    );

    fireEvent.contextMenu(getByText("Fichier.txt"));
    fireEvent.click(getByText("Delete"));

    expect(onDelete).toHaveBeenCalled();
});

it("triggers download action", async () => {
    const onDownload = fn();
    const { getByText } = render(
        <FileListItem node={node} onDownload={onDownload} />,
    );

    fireEvent.contextMenu(getByText("Fichier.txt"));
    fireEvent.click(getByText("Download"));

    expect(onDownload).toHaveBeenCalled();
});
