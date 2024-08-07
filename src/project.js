import PubSub from "./utils/pubsub"
import { EVENTS } from "./utils/constants"
<<<<<<< HEAD
import { displayProjectList } from "./UI"
=======
import { addDomElement } from "./utils/addDomElement"
>>>>>>> 7897cb17636323e426bd322eb4c48c5cb4f9faff

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

export function subscribeToProjectEvents(){
  PubSub.subscribe(EVENTS.PROJECT_ADDED, projectsManager.addProject)
  PubSub.subscribe(EVENTS.PROJECT_LIST_UPDATE, displayProjectList)
}


