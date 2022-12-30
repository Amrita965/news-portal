const createHTMLElement = (tagName, attributes = {}) => {
    const element = document.createElement(tagName);
    if (Object.keys(attributes).length != 0) {
        setAttributes(element, attributes);
    }
    return element;
}

const setAttributes = (element, attributes = {}) => {
    for (const key in attributes) {
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

const loader = isLoading => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('d-none');
    } else {
        spinner.classList.add('d-none');
    }
}


