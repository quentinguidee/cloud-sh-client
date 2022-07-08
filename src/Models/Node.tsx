export type Node = {
    uuid?: string;
    name: string;
    size?: string;
    type: string;
};

export type NodeUpload = Node & {
    percentage?: number;
    status?: "uploading" | "done" | "error";
};
