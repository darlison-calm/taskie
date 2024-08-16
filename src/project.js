import PubSub from "./utils/pubsub"
import { EVENTS } from "./utils/constants"
import { displayProjectList, populateSelectProject } from "./UI"

const projectsManager = (function() {
  const projects = ['Inbox']

  const addProject = (project) => {
    const alreadyExist = projects.some(pro => pro === project)
    if (alreadyExist) {
      alert('project already exist')
      return
    }
    projects.push(project)
    PubSub.publish(EVENTS.PROJECT_LIST_UPDATE , getProjects())
  }
  
  const deleteProject = (index) => projects.splice(index, 1)

  const getProjects = () => projects

  return {
    addProject,
    deleteProject,
    getProjects
  }
})()

export function subscribeToProjectEvents(){
  PubSub.subscribe(EVENTS.PROJECT_ADDED, projectsManager.addProject)
  PubSub.subscribe(EVENTS.PROJECT_LIST_UPDATE, displayProjectList)
  PubSub.subscribe(EVENTS.PROJECT_LIST_UPDATE, populateSelectProject)
}


