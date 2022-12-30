const createHTMLElement = (tagName, attributes = {}) => {
    const element = document.createElement(tagName);
    setAttributes(element, attributes);
    return element;
}   

const setAttributes = (element, attributes = {}) => {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

const setElementContentById = (elementId, content) => {
    const element = document.getElementById(elementId);
    element.innerText = content;
}

const getElementById = elementId => {
    return document.getElementById(elementId);
};
