import { Folder, Project, Task } from "../render/mediator.js";
import { addNewFolder, editFolder, removeFolder } from "./folderController.js";
import { createFolderElement, editCreatedFolderElement, removeCreatedFolderElement } from "../render/folderRender.js";
import { updateFolders } from "./menuController.js";
import { addNewProject, editProject, removeProject } from "./projectController.js";
import { createProjectElement, editCreatedProjectElement, removeCreatedProjectElement } from "../render/projectRender.js";
import { updateProjects } from "./menuController.js";
import { addNewTask, editTask, removeTask } from "./taskController.js";
import { createTaskElement, editCreatedTaskElement, removeCreatedTaskElement } from "../render/taskRender.js";
import { updateTasks } from "./menuController.js";

const creatingObjectOnType = {
    'Folder': Folder,
    'Project': Project,
    'Task': Task
};

const folderMethods = {
    createObject(value) {
        addNewFolder(...value);
    },
    createElementDOM(value) {
        createFolderElement(...value);
    },
    updateElements() {
        updateFolders();
    },
    editObject(targetFolder, value) {
        editFolder(targetFolder, ...value);
    },
    updateEditedCreatedElement(targetFolder, value) {
        editCreatedFolderElement(targetFolder, ...value);
    },
    removeObject(targetFolder) {
        removeFolder(targetFolder);
    },
    removeCreatedElement(targetFolder) {
        removeCreatedFolderElement(targetFolder);
    }
};

Object.assign(Folder.prototype, folderMethods);

const projectMethods = {
    createObject(value) {
        addNewProject(Project.folderSrc, Project.folderSrcId, ...value);
    },
    createElementDOM(value) {
        createProjectElement(...value);
    },
    updateElements() {
        updateProjects();
    },
    editObject(targetProject, value) {
        editProject(targetProject, ...value);
    },
    updateEditedCreatedElement(targetProject, value) {
        editCreatedProjectElement(targetProject, ...value);
    },
    removeObject(targetFolder) {
        removeProject(targetFolder);
    },
    removeCreatedElement(targetFolder) {
        removeCreatedProjectElement(targetFolder);
    }
};

Object.assign(Project.prototype, projectMethods);

const taskMethods = {
    createObject(value) {
        addNewTask(Task.projectSrc, Task.projectSrcId, ...value);
    },
    createElementDOM(value) {
        createTaskElement(...value);
    },
    updateElements() {
        updateTasks();
    },
    editObject(targetTask, value) {
        editTask(targetTask, ...value);
    },
    updateEditedCreatedElement(targetTask, value) {
        editCreatedTaskElement(targetTask, ...value);
    },
    removeObject(targetFolder) {
        removeTask(targetFolder);
    },
    removeCreatedElement(targetFolder) {
        removeCreatedTaskElement(targetFolder);
    }
};

Object.assign(Task.prototype, taskMethods);

export const addNewElement = function addNewElementDependingOnDialogType(elType, ...values) {
    const newElement = new creatingObjectOnType[elType];
    newElement.createObject(values);
    newElement.createElementDOM(values);
    newElement.updateElements();
};

export const editCreatedElement = function editCreatedElementDependingWithInput(elType, targetElement, ...values) {
    const newElement = new creatingObjectOnType[elType];
    newElement.editObject(targetElement, values);
    newElement.updateEditedCreatedElement(targetElement, values);
};

export const removeCreatedElement = function removeCreatedElementOnType(elType, targetElement) {
    const newElement = new creatingObjectOnType[elType];
    newElement.removeObject(targetElement);
    newElement.removeCreatedElement(targetElement);
};

