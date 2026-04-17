import { Element, Project } from "./mediator.js";

const findProjectList = function findProjectListFromDOM(projectName) {
    return [...document.querySelectorAll('.todo')].find((project) => project.id === projectName.id);
};

const findProjectTitle = function findProjectTitleFromDOM(projectName) {
    return [...document.querySelectorAll('.section')].find((project) => project.id === projectName.id).querySelector('.header__meta h1');
};

export const createProjectElement = function createProjectElementForDOM(title, color, id) {
    const elLi = new Element('li', title, 'todo',).createElementDOM();
    elLi.id = id;
    elLi.style.setProperty('--marker-color', color);
    Project.latestProjectElement = elLi;
};

export const editCreatedProjectElement = function editCreatedProjectElementFromDOM(targetProjectEl, title, marker) {
    const projectList = findProjectList(targetProjectEl);
    projectList.textContent = title;
    projectList.style.setProperty('--marker-color', marker);

    const projectTitle = findProjectTitle(targetProjectEl);
    projectTitle.textContent = title;
};

export const removeCreatedProjectElement = function removeCreatedProjectElementFromDOM(targetProjectEl) {
    const projectList = findProjectList(targetProjectEl);
    projectList.remove();

    const projectContent = findProjectTitle(targetProjectEl).closest('section');
    projectContent.remove();
};
