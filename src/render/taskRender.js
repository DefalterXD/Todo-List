import { Element, Icon, Task } from "./mediator.js";

export const createTaskElement = function createTaskElementForDOM(title, desc, dateToComplete, priority, note, id, status = false) {
    const elList = new Element('li', '', 'task').createElementDOM();
    elList.id = id;
    const checkMark = document.createElement('input');
    checkMark.type = 'checkbox';
    checkMark.name = 'task';
    checkMark.checked = status;
    
    const taskTitle = new Element('h2', `${title}`, 'task__title').createElementDOM();
    const taskEditContainer = new Element('div', '', 'edit__task').createElementDOM();
    const taskEdit = new Icon('edit_square').createElementDOM();
    taskEditContainer.appendChild(taskEdit);
    taskTitle.appendChild(taskEditContainer);
    
    const taskDesc = new Element('p', `${desc}`, 'task__desc').createElementDOM();
    const taskMetaInfo = new Element('div', '', 'task__meta').createElementDOM();
    const taskDate = new Element('h3', `${format(dateToComplete, "do MMMM y")}`, 'task__date').createElementDOM();
    const taskPriority = new Element('p', `${priority}`, 'task__priority', `${priority}`).createElementDOM();
    taskMetaInfo.append(taskDate, taskPriority);
    
    const taskNoteContainer = new Element('div', '', 'note__container').createElementDOM();
    const taskNoteTextarea = document.createElement('textarea');
    taskNoteTextarea.name = 'note';
    taskNoteTextarea.placeholder = 'Please write your note here...';
    taskNoteTextarea.name = 'note';
    taskNoteTextarea.id = crypto.randomUUID();
    taskNoteTextarea.value = note;
    taskNoteContainer.appendChild(taskNoteTextarea);
    elList.append(checkMark, taskTitle, taskDesc, taskMetaInfo, taskNoteContainer);
    Task.latestTaskElement = elList;
};

