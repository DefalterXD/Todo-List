import { Project } from "../render/mediator.js";
import { navMenu } from "./menuController.js";

const createProject = function createProjectObject(title, color, id) {
    const newProject = new Project(title, color, id);
    return newProject;
};


export const addNewProject = function addNewProjectToTheFolder(folderToAdd, folderIdToAdd, title, color, id) {
    const foundedFolder = navMenu.find((folder) => folder.title === folderToAdd && folder.id === folderIdToAdd);
    foundedFolder.projects.push(createProject(title, color, id));
};

export const editProject = function editProjectProperties(targetProject, newTitle, newMarker) {
    const foundedProject = navMenu.map((folder) => folder.projects.find((project) => project.id === targetProject.id)).find((project) => project);

    foundedProject.title = newTitle;
    foundedProject.color = newMarker;
};

export const removeProject = function removeProjectFromTheFolder(targetProject) {
    for (const folder of navMenu) {
        folder.projects = folder.projects.filter((project) => project.id !== targetProject.id);
    }
};
