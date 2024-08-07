import { addDomElement } from "./addDomElement";

export function loadHome() {
  const projectView = document.querySelector('.task-view')
  
  const element = addDomElement({
    tag : 'h1', 
    textContent: 'All Tasks', 
    attr: {'id': 'project-name'}
  });

  projectView.appendChild(element);

  return projectView;
}


