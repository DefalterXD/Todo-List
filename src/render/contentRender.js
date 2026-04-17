import { Element, Icon, Task } from "./mediator.js";
import { navMenu } from "../controller/menuController.js";
import { createTaskElement } from "../render/taskRender.js";

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

