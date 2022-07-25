import { Node } from "Models/Node";
import User from "Models/User";

export type Bucket = {
    uuid: string;
    name: string;
    type: string;
    size: number;
    root_node: Node;
    max_size?: number;
    users?: User[];
};
