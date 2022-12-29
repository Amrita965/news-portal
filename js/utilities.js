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
