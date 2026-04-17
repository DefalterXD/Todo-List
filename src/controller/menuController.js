import { Folder, Project, Task } from "../render/mediator.js";
import { navContainer } from "../render/headerRender.js";
export let navMenu = [];


export const updateFolders = function updateFoldersAppendingToTheDOM() {
    navContainer.appendChild(Folder.latestFolderElement);
};

export const updateProjects = function updateProjectsAppendingToTheDOM() {
    const foundedFolderElement = findFolder(Project.folderSrc, Project.folderSrcId).closest('ul');
    foundedFolderElement.appendChild(Project.latestProjectElement);
};

export const updateTasks = function updateTasksAppendingToTheDOM() {
    const latestSection = document.querySelector('section ul');
    latestSection.appendChild(Task.latestTaskElement);
};
