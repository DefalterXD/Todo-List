import { Element, Project } from "./mediator.js";


export const createProjectElement = function createProjectElementForDOM(title, color, id) {
    const elLi = new Element('li', title, 'todo',).createElementDOM();
    elLi.id = id;
    elLi.style.setProperty('--marker-color', color);
    Project.latestProjectElement = elLi;
}

