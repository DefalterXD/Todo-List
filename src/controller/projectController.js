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

