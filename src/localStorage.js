import { elementDOMForAppend } from "./render/mediator.js";
import { createContentHeader } from "./render/contentRender.js";
import { addNewElement } from "./controller/dialogController.js";
import { checkSelectedFolder, initializeDefaultFolder, prev } from "./index.js";
import { navMenu } from "./controller/menuController.js";
import { getFolderSrc } from "./controller/projectController.js";
import { getProjectSrc } from "./controller/taskController.js";

let loadedNavMenu = [];

export const getAllFolders = function getAllFoldersDependingOnAction() {
  const currentCopyOfNavMenu = navMenu;
  localStorage.setItem('navMenu', JSON.stringify(currentCopyOfNavMenu));
  const currentSelectedList = { "selected": document.querySelector('.selected').id };
  localStorage.setItem('selectedList', JSON.stringify(currentSelectedList));
};

const renderAllContent = function renderAllContentFromLocalStorage() {
  loadedNavMenu = JSON.parse(localStorage.getItem('navMenu'));
  renderHeader();
  const selectedElementId = JSON.parse(localStorage.getItem('selectedList')).selected;
  document.getElementById(`${selectedElementId}`).classList.add('selected');
  prev.previousSelected = document.getElementById(`${selectedElementId}`);
  navMenu.splice(0, navMenu.length, ...loadedNavMenu);
  checkSelectedFolder(prev.previousSelected);
};

const renderHeader = function renderHeaderFromLocalStorage() {
  for (const folder of loadedNavMenu) {
    addNewElement('Folder', folder.title, folder.id);
    getFolderSrc(folder.title, folder.id);
    for (const project of folder.projects) {
      addNewElement('Project', project.title, project.color, project.id);
      getProjectSrc(project.title, project.id);
    }
  }
};

export const ifLocalStorageExist = function ifLocalStorageExistWhenReload(prev) {
  if (!localStorage.getItem('navMenu')) {
    initializeDefaultFolder();
    getAllFolders();
  } else {
    renderAllContent();
  }
};
