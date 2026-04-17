import { Element, Icon, Task, Inbox, Today, Upcoming, Checklist } from "./mediator.js";
import { navMenu } from "../controller/menuController.js";
import { createTaskElement } from "../render/taskRender.js";


const findSelectedProject = function findSelectedProjectFromId(selectedProject) {
    for (const folder of navMenu) {
        for (const project of folder.projects) {
            if (project.id === selectedProject) return project;
        }
    }
};
export const createContentHeader = function createContentHeaderOfTheProject(selectedProject) {
    const project = findSelectedProject(selectedProject);
    const elSection = new Element('section', '', 'section').createElementDOM();
    elSection.id = project.id;
    const headerMetaInfoContainer = new Element('div', '', `header__meta`).createElementDOM();
    const headerFolderTitle = new Element('h1', `${project.title}`).createElementDOM();
    const headerEditButton = new Element('button', '', 'edit__project').createElementDOM();
    const headerEditButtonTitle = new Element('p', 'Edit Project', 'edit__title').createElementDOM();
    headerEditButton.appendChild(headerEditButtonTitle);
    const ulTaskList = new Element('ul', '', 'task__list').createElementDOM();
    const addTaskButton = new Element('div', '', 'add__task').createElementDOM();
    const addTaskIcon = new Icon('add').createElementDOM();
    addTaskButton.appendChild(addTaskIcon);
    
    headerMetaInfoContainer.append(headerFolderTitle, headerEditButton);
    elSection.append(headerMetaInfoContainer, ulTaskList, addTaskButton);
    return elSection;
};

export const renderExistingProjectTasks = function renderExistingProjectTasks(selectedProject) {
    const project = findSelectedProject(selectedProject);
    const latestSection = document.querySelector('section ul');
    for (const task of project.tasks) {
        createTaskElement(task.title, task.desc, task.dateToComplete, task.priority, task.note, task.id, task.status);
        latestSection.appendChild(Task.latestTaskElement);
    }
};

