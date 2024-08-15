import { projectForm } from "./project-form";
import { subscribeToProjectEvents } from "./project";
import { taskForm } from "./task-form";
import { subscribeToInitialTaskEvents } from "./task-factory";
import { taskManager} from "./task-factory"

import PubSub from "./utils/pubsub";
import { EVENTS } from "./utils/constants";
import { setupNavTasksButtons} from "./navigation";
import { initializeNavigation } from "./navigation";
//TODO: 
projectForm.setupAddProjectEventListener();
subscribeToProjectEvents();
taskForm.setupAddTaskEventListener();
subscribeToInitialTaskEvents();
initializeNavigation()



//display today tasks





//const todos = []
/* function addTodoItem(title, dueDate = '', priority = '', description = '', complete = false) {
  const todoItem = new TodoFactory(title, dueDate, priority, description, complete)
  todos.push(todoItem)
  PubSub.publish('todoAdded', todoItem)
}

function addTodoToProject(todo, project) {
  const projects = projectsManager.getProjects()
  const projectExist = projects.some((e) => e === project)
  if(!projectExist){
    console.log("Project does not exist")
    return
  }
  todo.projectId = project
} */

/* addTodoItem('casa')
addTodoItem('ferro') */





//Create function that add the project's id to task projectId property










