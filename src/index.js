import { loadHome } from "./homePage";
import { projectForm } from "./project-form";
import { subscribeToProjectEvents } from "./project";
loadHome()

//TODO: 
projectForm.setupAddProjectEventListener();
subscribeToProjectEvents()


document.addEventListener('click', e => {
  console.log(e.target)
})







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










