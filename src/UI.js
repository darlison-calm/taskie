import { addDomElement } from "./utils/addDomElement";

export function displayProjectList(projects) {
  const projectsContainer = document.getElementById("projects-container");
  projectsContainer.innerHTML = ''

  projects.forEach(pro => {
    let projectItem = addDomElement({
      tag: 'button',
      textContent: pro,
      className: 'btn-projects',
      attr: {
        'data-index': `${pro} Project`
      }
    });

    projectsContainer.append(projectItem);
  });

}