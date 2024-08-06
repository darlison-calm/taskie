import PubSub from "./utils/pubsub"
import { EVENTS } from "./utils/constants"


const projectsManager = (function() {
  const projects = []

  const addProject = (project) => {
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
  const projectsContainer = document.querySelector(".projects-container");
  projectsContainer.innerHTML = ''

  let projectList = document.createElement('ul')

  projects.forEach(pro => {
    let projectItem = document.createElement('li')
    projectItem.textContent = pro
    projectList.appendChild(projectItem)
  });

  projectsContainer.appendChild(projectList)
}

export function subscribeToProjectEvents(){
  PubSub.subscribe(EVENTS.PROJECT_ADDED, projectsManager.addProject)
  PubSub.subscribe(EVENTS.PROJECT_LIST_UPDATE, displayProjectList)
}


