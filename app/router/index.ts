import { createWorkspace, listWorkSpaces } from "./workspace";

export const router = {
    workspace: {
        list: listWorkSpaces,
        create: createWorkspace,
    },
};
