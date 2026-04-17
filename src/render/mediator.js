export const elementDOMForAppend = {
    body: document.querySelector('body'),
    content: document.querySelector('#content')
};

export class Element {
    constructor(element, elValue, ...elClass) {
        this.element = element;
        this.elValue = elValue;
        this.elClass = elClass;
    }

    createElementDOM() {
        const element = document.createElement(`${this.element}`);
        element.classList.add(...this.elClass);
        element.textContent = `${this.elValue}`;

        return element;
    }

    static prependElementDOM(parent, child) {
        parent.prepend(child);
    }
}

export class Icon {
    constructor(type) {
        this.type = type;
    }

    createElementDOM() {
        const element = document.createElement(`span`);
        element.classList.add('material-symbols-outlined');
        element.textContent = `${this.type}`;
        
        return element;
    }
}

export class Folder {
    static latestFolderElement;

    constructor(title, id) {
        this.title = title;
        this.id = id;
        this.projects = [];
    }
}

export class Project {
    static folderSrc;
    static folderSrcId;
    static latestProjectElement;

    constructor(title, color, id) {
        this.title = title;
        this.color = color;
        this.id = id;
        this.tasks = [];
    }
}

