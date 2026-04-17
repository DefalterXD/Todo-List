import { Folder, Project, Task } from "../render/mediator.js";
import { navContainer } from "../render/headerRender.js";
export let navMenu = [];


export const updateFolders = function updateFoldersAppendingToTheDOM() {
    navContainer.appendChild(Folder.latestFolderElement);
};

