import { projectsManager } from "../models/project";
import { Task, taskManager } from "../models/task-factory";

export function saveTaskState() {
  const tasks = taskManager.getAllTasks();
  localStorage.setItem('tasks', JSON.stringify(tasks));
} 

export function loadTaskState() {
  let savedTasks;
  savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const tasksLoaded = savedTasks.map((json) => {
    const task = new Task(json._title, json._dueDate, json._priority, json._description, json._projectId);
    task.complete = json._complete
    task.id = json._id
    return task
  })
  taskManager.setTasks(tasksLoaded);
}

export function saveProjectState() {
  const projects = projectsManager.getProjects()
  localStorage.setItem('projects', JSON.stringify(projects));
} 

export function loadProjectState () {
  let savedProjects =  JSON.parse(localStorage.getItem('projects')) || [];
  projectsManager.setProjects(savedProjects)
}

