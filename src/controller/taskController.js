import { Task } from "../render/mediator.js";
import { navMenu } from "./menuController.js";

const createTask = function createTaskObject(title, desc, dateToComplete, priority, note, id) {
    const newTask = new Task(title, desc, dateToComplete, priority, note, id);
    return newTask;   
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

