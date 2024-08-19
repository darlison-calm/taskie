import PubSub from "./utils/pubsub";
import { EVENTS } from "./utils/constants";
import { taskManager } from "./task-factory";
import { displayTodaysTasks, displayAllTasks, displayWeekTasks, manageActiveBtnStyle, projectTaskUpdate} from './UI.js';

export function initializeNavigation() {
  setupNavTasksButtons('#today-btn', displayTodaysTasks, [displayAllTasks, displayWeekTasks]);
  setupNavTasksButtons('#all-btn', displayAllTasks, [displayTodaysTasks, displayWeekTasks]);
  setupNavTasksButtons('#week-btn', displayWeekTasks, [displayAllTasks, displayTodaysTasks]);
}

function setupNavTasksButtons(buttonId, displayFn, unsubscribeFn) {
  const button = document.querySelector(buttonId)
  
  button.addEventListener('click', () => {
    manageActiveBtnStyle(button)
    updateTaskSubscriptions(displayFn, unsubscribeFn)
    publishTasks()
  })
}

function updateTaskSubscriptions(displayFn, unsubscribeFn) {
  PubSub.subscribe(EVENTS.TASK_LIST_UPDATE, displayFn)
  unsubscribeFn.forEach(fn => PubSub.unsubscribe(EVENTS.TASK_LIST_UPDATE, fn))
}

export function publishTasks() {
  const tasks = taskManager.getTasks();
  PubSub.publish(EVENTS.TASK_LIST_UPDATE, tasks);
}





