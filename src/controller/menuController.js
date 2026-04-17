import { Folder, Project, Task } from "../render/mediator.js";
import { navContainer } from "../render/headerRender.js";
export let navMenu = [];

const findFolder = function findFolderThroughSrc(folderName, folderId) {
    const result = [...document.querySelectorAll('.project__title .edit__folder')]
    .find((folder) => folder.firstChild.textContent === folderName && folder.closest('ul').id === folderId);
    return result;
};

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
