import { Element, Icon } from "./mediator.js";

export const headerContainer = (function createHeaderContainerDOMForNavigation() {
    const header = new Element('header', '', 'header__container').createElementDOM();

    return header;
})();

export const navContainer = (function createNavigationContainerDOMForUnorderedList() {
    const nav = new Element('nav', '', 'nav__container').createElementDOM();

    return nav;
})();

const headerTitle = (function createHeaderTitleDOMForNav() {
    const headerTitle = new Element('h1', 'Todo-List', 'header__title').createElementDOM();

    return headerTitle;
})();

const appendMainElementsIntoHeader = function appendMainElementsIntoHeaderContainerForInitialization() {
    navContainer.append(headerTitle);
    headerContainer.appendChild(navContainer);
};

const createAndAppendAddFolderButton = function createAndAppendAddListButtonIntoNav() {
    const addFolderContainer = new Element('div', '', 'add__container').createElementDOM();
    const addButtonFolder = new Element('button', '', 'add__folder').createElementDOM();
    const addButtonFolderIcon = new Icon('add').createElementDOM();
    const addButtonTitle = new Element('p', 'Add Folder', 'add__title').createElementDOM();

    addButtonFolder.append(addButtonFolderIcon, addButtonTitle);
    addFolderContainer.appendChild(addButtonFolder);
    headerContainer.append(addFolderContainer);
};


const initHeaderContainer = function initHeaderContainerForRender() {
    appendMainElementsIntoHeader();
    createAndAppendAddFolderButton();
};

initHeaderContainer();
