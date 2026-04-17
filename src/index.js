import "./reset.css";
import "./style.css";
import { addNewElement, editCreatedElement, removeCreatedElement } from "./controller/dialogController.js";
import { getFolderSrc } from "./controller/projectController.js"
import { getProjectSrc, changeStatus, takeNewNoteInput } from "./controller/taskController.js";
import { headerContainer } from "./render/headerRender.js";
import { elementDOMForAppend } from "./render/mediator.js";
import { createContentHeader, renderExistingProjectTasks, createMainHeader, renderExistingMainTasks } from "./render/contentRender.js";

elementDOMForAppend.body.prepend(headerContainer);
let prev;
let modalType;
let latestElementToEdit;

const checkSrcType = function checkSrcTypeOnAction(src) {

    if (src.closest('li')) {
        latestElementToEdit = src.closest('li');
    }
    else if (src.closest('section')) {
        getProjectSrc(src.closest('section').querySelector('.header__meta h1').textContent, src.closest('section').id);
        latestElementToEdit = src.closest('section');
    }
    else if (src.closest('ul')) {
        getFolderSrc(src.closest('ul').querySelector('.edit__folder').firstChild.textContent, src.closest('ul').id);
        latestElementToEdit = src.closest('ul');
    }
};

const checkSelectedFolder = function checkSelectedFolderOrMainLinks(selectedList) {
    if (selectedList.classList.contains('selected') && selectedList.classList.contains('todo')) {
        let selectedProjectListId = selectedList.id;
        elementDOMForAppend.content.textContent = '';
        elementDOMForAppend.content.appendChild(createContentHeader(selectedProjectListId));
        renderExistingProjectTasks(selectedProjectListId);
    } else {
        let selectedProjectListId = selectedList.id;
        elementDOMForAppend.content.textContent = '';
        elementDOMForAppend.content.appendChild(createMainHeader(selectedProjectListId));
        renderExistingMainTasks(selectedProjectListId);
    }
};

const sendDataToAdd = function sendDataToAddController(e) {
    e.preventDefault();
    const activatedModal = e.target.closest('dialog');
    const modalType = activatedModal.id.charAt(0).toUpperCase() + activatedModal.id.slice(1);
    const allFieldsValue = [...e.target.closest('form').querySelectorAll('input')].map((input) => input.value);

    const allFieldsValueWithoutSpace = allFieldsValue.map((input) => input.trim());

    // IF either of the fields exist include them into the array
    if (e.target.closest('form').querySelector('select')) allFieldsValueWithoutSpace.push(e.target.closest('form').querySelector('select').value);
    if (e.target.closest('form').querySelector('textarea')) allFieldsValueWithoutSpace.push(e.target.closest('form').querySelector('textarea').value);

    // IF the title, desc and date isn't empty then proceed with the form
    if (allFieldsValueWithoutSpace[0] !== '' && allFieldsValueWithoutSpace[1] !== '' && allFieldsValueWithoutSpace[2] !== '') {
        // SET unique id of the created element and include them
        const uniqueId = crypto.randomUUID();
        allFieldsValueWithoutSpace.push(uniqueId);
        addNewElement(modalType, ...allFieldsValueWithoutSpace);
        activatedModal.close();
    }
};

const sendDataToEdit = function sendDataToEditController(e) {
    e.preventDefault();
    const activatedModal = e.target.closest('dialog');
    const modalType = activatedModal.id.charAt(0).toUpperCase() + activatedModal.id.slice(1);
    const allFieldsValue = [...e.target.closest('form').querySelectorAll('input')].map((input) => input.value);

    const allFieldsValueWithoutSpace = allFieldsValue.map((input) => input.trim());

    // IF either of the fields exist include them into the array
    if (e.target.closest('form').querySelector('select')) allFieldsValueWithoutSpace.push(e.target.closest('form').querySelector('select').value);
    if (e.target.closest('form').querySelector('textarea')) allFieldsValueWithoutSpace.push(e.target.closest('form').querySelector('textarea').value);

    // IF the title, desc and date isn't empty then proceed with the form
    if (allFieldsValueWithoutSpace[0] !== '' && allFieldsValueWithoutSpace[1] !== '' && allFieldsValueWithoutSpace[2] !== '') {
        editCreatedElement(modalType, latestElementToEdit, ...allFieldsValueWithoutSpace);
        activatedModal.close();
    }
};

const sendDataToRemove = function sendDataToRemoveController(e) {
    e.preventDefault();
    const activatedModal = e.target.closest('dialog');
    const modalType = activatedModal.id.charAt(0).toUpperCase() + activatedModal.id.slice(1);
    const currentSelectedProject = document.querySelector('.selected');
    removeCreatedElement(modalType, latestElementToEdit);
    if (modalType === 'Folder' && (currentSelectedProject.id === 'Inbox' || currentSelectedProject.id === 'Today' 
    || currentSelectedProject.id === 'Upcoming' || currentSelectedProject.id === 'Checklist')) {
        checkSelectedFolder(currentSelectedProject);
    }
    activatedModal.close();
};

const activateModalAdd = function activateModalForAdd(modal) {
    modal.showModal();

    const buttonSubmit = modal.querySelector('.submit');
    if (buttonSubmit !== null) {
        buttonSubmit.addEventListener('click', sendDataToAdd);
    }

    const buttonClose = modal.querySelector('.close');
    if (buttonClose !== null) {
        buttonClose.addEventListener('click', () => {
            buttonSubmit.removeEventListener('click', sendDataToAdd);
            modal.close();
        });
    }
};

const activateModalEdit = function activateModalForEditOrDelete(modal) {
    modal.showModal();

    const buttonEdit = modal.querySelector('.edit');
    if (buttonEdit !== null) {
        buttonEdit.addEventListener('click', sendDataToEdit);
    }

    const buttonClose = modal.querySelector('.close');
    if (buttonClose !== null) {
        buttonClose.addEventListener('click', () => {
            buttonEdit.removeEventListener('click', sendDataToEdit);
            modal.close();
        });
    }

    const buttonRemove = modal.querySelector('.remove');
    if (buttonRemove !== null) {
        buttonRemove.addEventListener('click', sendDataToRemove);
    }
};

const initializeDefaultFolder = function initializeDefaultFolderWithProjectAndTask() {
    const uniqueId = crypto.randomUUID();
    addNewElement('Folder', 'Welcome', uniqueId);
    getFolderSrc('Welcome', uniqueId);
    addNewElement('Project', 'Welcome Project', '#000', uniqueId);
    getProjectSrc('Welcome Project', uniqueId);
    document.getElementById(`${uniqueId}`).querySelector('input').checked = true;
    document.getElementById(`${uniqueId}`).querySelector('li').classList.add('selected');
    prev = document.getElementById(`${uniqueId}`).querySelector('li');
    elementDOMForAppend.content.appendChild(createContentHeader(uniqueId));
    renderExistingProjectTasks(uniqueId);
    addNewElement('Task', 'Welcome', 'To the Todo List', '2026-01-01', 'urgent', 'You can write notes here...', uniqueId);
};

headerContainer.addEventListener('click', (e) => {
    if (e.target.localName !== 'li') return;
    prev.classList.toggle('selected');
    e.target.classList.toggle('selected');
    checkSelectedFolder(e.target);
    prev = e.target;
});


document.addEventListener('click', (e) => {
    const buttonElementOfAction = e.target.parentElement.classList.toString().split('__')[0];
    const actionForWhichType = e.target.parentElement.classList.toString().split('__')[1];
    if (!(buttonElementOfAction || actionForWhichType)) return;
    modalType = document.querySelector(`.${buttonElementOfAction}#${actionForWhichType}`);
    if (modalType === null) return;

    if (buttonElementOfAction === 'add') {
        checkSrcType(e.target);
        activateModalAdd(modalType);
    } else if (buttonElementOfAction === 'edit') {
        checkSrcType(e.target);
        activateModalEdit(modalType);
    }
});

elementDOMForAppend.content.addEventListener('click', (e) => {
    if (e.target.localName !== 'li') return;
    const note = e.target.querySelector('.note__container');
    note.style.display = (note.style.display === 'none' || note.style.display === '') ? 'block' : 'none';
});

elementDOMForAppend.content.addEventListener('input', (e) => {
    changeStatus(e.target.closest('li').id, e.target.checked);
});

elementDOMForAppend.content.addEventListener('keyup', (e) => {
    takeNewNoteInput(e.target.closest('li').id, e.target.value);
});

