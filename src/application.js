import PubSub from "./utils/pubsub.js";
import { EVENTS } from "./utils/constants.js";
import { taskManager } from "./task-factory.js";
import { projectsManager } from "./project.js";
import { displayTasks, manageActiveBtnStyle, displayProjectList, openNav, closeNav} from './UI.js';
import { format } from "date-fns";
import { saveProjectState, saveTaskState } from "./storageManager.js";

export function createTask(task) {
  taskManager.addTask(task)
  saveTaskState()
  renderTasks()
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

function setupNavTasksButtons(buttonId, project) {
  const button = document.querySelector(buttonId)

  button.addEventListener('click', () => {
    manageActiveBtnStyle(button)
    projectsManager.setCurrentProject(project)
    displayTasks(taskManager.getTasksByProjectId(project))
  })
}

function toogleSidebar() {
  const toogleSideBtn = document.querySelector(".fa-bars")

  toogleSideBtn.addEventListener("click" , () => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar.classList.contains("toogle-sidebar")) {
      openNav();
    } else {
      closeNav();
    }
  })
}


export function renderProjectList() {
  PubSub.publish(EVENTS.PROJECT_LIST_UPDATE , projectsManager.getProjects())
}

export function renderTasks() {
  const currentProject = projectsManager.getCurrentProject()
  PubSub.publish(EVENTS.TASK_LIST_UPDATE, taskManager.getTasksByProjectId(currentProject))
}

export function initializeNavigation() {
  setupNavTasksButtons('#today-btn', 'Hoje')
  setupNavTasksButtons('#week-btn', 'Semana')
  setupNavTasksButtons('#all-btn', 'Inbox')
  toogleSidebar();
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
