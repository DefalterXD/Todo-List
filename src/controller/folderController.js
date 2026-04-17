import { Folder } from "../render/mediator.js";

const createFolder = function createFolderObject(title, id) {
    const newFolder = new Folder(title, id);
    return newFolder;    
};

export const addNewFolder = function addNewFolderToTheMenu(title, id) {
    navMenu.push(createFolder(title, id));
};

