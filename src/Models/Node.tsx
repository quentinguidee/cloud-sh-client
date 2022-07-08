export type Node = {
    uuid?: string;
    name: string;
    type: string;
};

export type NodeUpload = Node & {
    percentage?: number;
};
