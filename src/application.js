import PubSub from "./utils/pubsub.js";
import { EVENTS } from "./utils/constants.js";
import { taskManager } from "./task-factory.js";
import { projectsManager } from "./project.js";
import { displayTodaysTasks, displayAllTasks, displayWeekTasks, manageActiveBtnStyle, displayProjectList, populateSelectProject} from './UI.js';

function createTask(task) {
  taskManager.addTask(task)
  PubSub.publish(EVENTS.TASK_LIST_UPDATE, taskManager.getTasks())
}

function deleteTask(task) {
  taskManager.deleteTask(task)
  PubSub.publish(EVENTS.TASK_LIST_UPDATE, taskManager.getTasks());
}

function createProject(name) {
  projectsManager.addProject(name)
  PubSub.publish(EVENTS.PROJECT_LIST_UPDATE , projectsManager.getProjects())
}

function setupNavTasksButtons(buttonId, displayFn, unsubscribeFn) {
  const button = document.querySelector(buttonId)
  
  button.addEventListener('click', () => {
    manageActiveBtnStyle(button)
    updateTaskSubscriptions(displayFn, unsubscribeFn)
    PubSub.publish(EVENTS.TASK_LIST_UPDATE, taskManager.getTasks());
  })
}

function updateTaskSubscriptions(displayFn, unsubscribeFn) {
  PubSub.subscribe(EVENTS.TASK_LIST_UPDATE, displayFn)
  unsubscribeFn.forEach(fn => PubSub.unsubscribe(EVENTS.TASK_LIST_UPDATE, fn))
}

export function subscribeToInitialTaskEvents() {
  PubSub.subscribe(EVENTS.TASK_ADDED, createTask)
  PubSub.subscribe(EVENTS.TASK_LIST_UPDATE, displayAllTasks)
  PubSub.subscribe(EVENTS.TASK_DELETED, deleteTask)
}

export function subscribeToProjectEvents() {
  PubSub.subscribe(EVENTS.PROJECT_ADDED, createProject)
  PubSub.subscribe(EVENTS.PROJECT_LIST_UPDATE, displayProjectList)
  PubSub.subscribe(EVENTS.PROJECT_LIST_UPDATE, populateSelectProject)
}

export function initializeNavigation() {
  setupNavTasksButtons('#today-btn', displayTodaysTasks, [displayAllTasks, displayWeekTasks]);
  setupNavTasksButtons('#all-btn', displayAllTasks, [displayTodaysTasks, displayWeekTasks]);
  setupNavTasksButtons('#week-btn', displayWeekTasks, [displayAllTasks, displayTodaysTasks]);
}

