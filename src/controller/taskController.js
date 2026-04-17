import { Task } from "../render/mediator.js";
import { navMenu } from "./menuController.js";

const createTask = function createTaskObject(title, desc, dateToComplete, priority, note, id) {
    const newTask = new Task(title, desc, dateToComplete, priority, note, id);
    return newTask;   
};

export const getProjectSrc = function getProjectSrcForCorrespondingProject(projectName, projectId) {
    Task.projectSrc = projectName;
    Task.projectSrcId = projectId;
};

export const addNewTask = function addNewTaskToTheProject(projectToAdd, projectIdToAdd, title, desc, dateToComplete, priority, note, id) {
    let foundedProject;
    for (const folder of navMenu) {
        for (const project of folder.projects) {
            if (project.title === projectToAdd && project.id === projectIdToAdd) foundedProject = project;
        }
    }

    foundedProject.tasks.push(createTask(title, desc, dateToComplete, priority, note, id));
};

export const editTask = function editTaskProperties(targetTask, newTitle, newDesc, newDateToComplete, newPriority, newNote) {
    let foundedTask;

    for (const folder of navMenu) {
        for (const project of folder.projects) {
            for (const task of project.tasks) {
                if (task.id === targetTask.id) foundedTask = task;
            }
        }
    }

    foundedTask.title = newTitle;
    foundedTask.desc = newDesc;
    foundedTask.dateToComplete = newDateToComplete;
    foundedTask.priority = newPriority;
    foundedTask.note = newNote;
};

export const removeTask = function removeTaskFromTheProject(targetTask) {
    for (const folder of navMenu) {
        for (const project of folder.projects) {
            project.tasks = project.tasks.filter((task) => task.id !== targetTask.id);
        }
    }
};

export const changeStatus = function changeStatusOfTheTask(taskId, changedTaskStatus) {
    for (const folder of navMenu) {
        for (const project of folder.projects) {
            for (const task of project.tasks) {
                if (task.id === taskId) task.status = changedTaskStatus;
            }
        }
    }
};

export const takeNewNoteInput = function takeNewNoteInputOfTheTask(taskId, newNote) {
    for (const folder of navMenu) {
        for (const project of folder.projects) {
            for (const task of project.tasks) {
                if (task.id === taskId) task.note = newNote;
            }
        }
    }
};
