export type Node = {
    uuid?: string;
    name: string;
    size?: number;
    type: string;
    mime?: string;
    bucket_uuid?: string;
    created_at?: string;
    updated_at?: string;
};

export type NodeUpload = Node & {
    percentage?: number;
    status?: "uploading" | "done" | "error";
};
