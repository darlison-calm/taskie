import PubSub from "./utils/pubsub"
import { EVENTS } from "./utils/constants"
import { addDomElement } from "./utils/addDomElement"


const projectsManager = (function() {
  const projects = []

  const addProject = (project) => {
    //TO DO
    //CHECK IF A PROJECT WAS ALREADY ADDD    
    projects.push(project)
    PubSub.publish(EVENTS.PROJECT_LIST_UPDATE , projectsManager.getProjects())
  }
  
  const deleteProject = (index) => projects.splice(index, 1)

  const getProjects = () => projects

  return {
    addProject,
    deleteProject,
    getProjects
  }
})()

function displayProjectList(projects) {
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

export function subscribeToProjectEvents(){
  PubSub.subscribe(EVENTS.PROJECT_ADDED, projectsManager.addProject)
  PubSub.subscribe(EVENTS.PROJECT_LIST_UPDATE, displayProjectList)
}


