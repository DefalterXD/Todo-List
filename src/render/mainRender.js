import { Element } from "./mediator.js";

const mainListElementsArray = [];

// RENDER the main ul for 'inbox', 'today', 'upcoming' and 'checklist'
export const ulMain = (function createUnorderedMainMenuForLinks() {
    const ulMain = new Element('ul', '', 'main').createElementDOM();

    return ulMain;
})();

const iconTypeElement = function createIconElementForList(type) {
    const iconElement = new Element('span', type, 'material-symbols-outlined').createElementDOM();

    return iconElement;
};

const mainLiElement = function pushMainListElementForUlMainMenu(iconTypeElement, iconName, iconText) {
    const mainLiElementWithIcon = new Element('li', iconText, 'date', iconName).createElementDOM();
    mainLiElementWithIcon.id = iconText;
    Element.prependElementDOM(mainLiElementWithIcon, iconTypeElement);

    mainListElementsArray.push(mainLiElementWithIcon);
};

const createInboxElement = function createInboxElementForUlMainMenu() {
    const iconTypeInboxElement = iconTypeElement('inbox');
    mainLiElement(iconTypeInboxElement, 'inbox', 'Inbox');
};

const createTodayElement = function createTodayElementForUlMainMenu() {
    const iconTypeTodayElement = iconTypeElement('today');
    mainLiElement(iconTypeTodayElement, 'today', 'Today');
};

const createUpcomingElement = function createUpcomingElementForUlMainMenu() {
    const iconTypeUpcomingElement = iconTypeElement('upcoming');
    mainLiElement(iconTypeUpcomingElement, 'upcoming', 'Upcoming');
};

const createChecklistElement = function createChecklistElementForUlMainMenu() {
    const iconTypeCompletedElement = iconTypeElement('checklist');
    mainLiElement(iconTypeCompletedElement, 'checklist', 'Checklist');
};

const initMainIconElements = function initMainIconElementsForMainUl() {
    createInboxElement();
    createTodayElement();
    createUpcomingElement();
    createChecklistElement();
};

const appendElementsIntoMainUl = function appendElementsIntoMainUl() {
    ulMain.append(...mainListElementsArray);
};

initMainIconElements();
appendElementsIntoMainUl();
