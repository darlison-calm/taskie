export function addDomElement({tag, textContent = '', className = '', attr = {}}) {
  
  const element = document.createElement(tag);

  if (Array.isArray(className)) {  
    className.forEach(cls => element.classList.add(cls));

  } else if (className) {
    
    element.classList.add(className)
  }

  if (textContent) {
    element.textContent = textContent;
  }
  
  if (attr) {
    for (const [key, value] of Object.entries(attr)) {
      element.setAttribute(key, value);
    }
  }
  return element;
}
