import PubSub from "./utils/pubsub.js";
import { EVENTS } from "./utils/constants.js";
import { taskManager } from "./task-factory.js";
import { projectsManager } from "./project.js";
import { displayTasks, manageActiveBtnStyle, displayProjectList} from './UI.js';
import { format } from "date-fns";
import { saveProjectState, saveTaskState } from "./storageManager.js";

export function createTask(task) {
  taskManager.addTask(task)
  saveTaskState()
  renderTasks()
}

export function renderTasks() {
  const currentProject = projectsManager.getCurrentProject()
  PubSub.publish(EVENTS.TASK_LIST_UPDATE, taskManager.getTasksByProjectId(currentProject))
}

export function editTask(newTask, oldTaskId) {
  taskManager.editTask(newTask, oldTaskId)
  saveTaskState()
  renderTasks()
}

function deleteTask(task) {
  taskManager.deleteTask(task)
  saveTaskState()
  renderTasks()
}

function createProject(name) {
  projectsManager.addProject(name)
  saveProjectState();
  renderProjectList();
}

export function renderProjectList() {
  PubSub.publish(EVENTS.PROJECT_LIST_UPDATE , projectsManager.getProjects())
}

function setupNavTasksButtons(buttonId, project) {
  const button = document.querySelector(buttonId)

  button.addEventListener('click', () => {
    manageActiveBtnStyle(button)
    projectsManager.setCurrentProject(project)
    displayTasks(taskManager.getTasksByProjectId(project))
  })
}
export function initializeNavigation() {
  setupNavTasksButtons('#today-btn', 'Today')
  setupNavTasksButtons('#week-btn', 'Week')
  setupNavTasksButtons('#all-btn', 'Inbox')
}

export function subscribeToInitialTaskEvents() {
  PubSub.subscribe(EVENTS.TASK_ADDED, createTask)
  PubSub.subscribe(EVENTS.TASK_LIST_UPDATE, displayTasks)
  PubSub.subscribe(EVENTS.TASK_DELETED, deleteTask)
}

export function subscribeToProjectEvents() {
  PubSub.subscribe(EVENTS.PROJECT_ADDED, createProject)
  PubSub.subscribe(EVENTS.PROJECT_LIST_UPDATE, displayProjectList)
}

export function checkMatchingDate(taskDueDate, conditionFn) {
  const today = new Date()
  const todaysString = format(today, 'yyyy-MM-dd');
  return conditionFn(todaysString, taskDueDate)
}
