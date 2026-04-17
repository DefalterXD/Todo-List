import { Element, Icon, Folder } from "./mediator.js";

export const createFolderElement = function createFolderElementForDOM(title, id) {
    const uniqueId = crypto.randomUUID();
    const elFolder = new Element('ul', '', 'project').createElementDOM();
    elFolder.id = id;
    const elProjectTitle = new Element('h2', '', 'project__title').createElementDOM();
    const elAddList = new Element('p', title, 'edit__folder').createElementDOM();
    const elEditFolder = new Icon('edit').createElementDOM();
    const elLabelFolder = new Element('label', '', 'mark').createElementDOM();
    elLabelFolder.htmlFor = uniqueId;
    const elMarkArrow = new Icon('chevron_right').createElementDOM();
    const elInputFolder = document.createElement('input');
    elInputFolder.type = 'checkbox';
    elInputFolder.id = uniqueId;
    const elButtonAddProject = new Element('button', '', 'add__project').createElementDOM();
    const elIconAddProject = new Icon('add').createElementDOM();
    const elTextAddProject = new Element('p', 'New Project', 'add__title').createElementDOM();

    elFolder.append(elProjectTitle, elInputFolder, elButtonAddProject);
    elProjectTitle.append(elAddList, elLabelFolder);
    elAddList.appendChild(elEditFolder);
    elLabelFolder.appendChild(elMarkArrow);
    elButtonAddProject.append(elIconAddProject, elTextAddProject);
    Folder.latestFolderElement = elFolder;
}

export const editCreatedFolderElement = function editCreatedFolderElementFromDOM(targetFolderEl, value) {
    const folder = findFolder(targetFolderEl).querySelector('.project__title .edit__folder');
    folder.firstChild.textContent = value;
}

