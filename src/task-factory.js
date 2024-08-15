import PubSub from "./utils/pubsub";
import { EVENTS } from "./utils/constants";
import { displayAllTasks} from "./UI";

export const taskManager = (function() {
  const tasksList = []

  const addTask = (task) => {
    tasksList.push(task);
    PubSub.publish(EVENTS.TASK_LIST_UPDATE, taskManager.getTasks())
  }

  const getTasks = () => {
    return tasksList
  }

  const deleteTask = (index) => {
    tasksList.splice(index, 1)
    PubSub.publish(EVENTS.TASK_LIST_UPDATE, taskManager.getTasks())
  }

  return {
    addTask,
    getTasks,
    deleteTask
  }

})()

export class Task {
  constructor(title, dueDate = '', priority = '', description, complete = false) {
    this._title = title;
    this._dueDate = dueDate;
    this._priority = priority;
    this._description = description;
    this._complete = complete;
    this._projectId = ''
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get dueDate() {
    return this._dueDate;
  }

  set dueDate(value) {
    this._dueDate = value;
  }

  get priority() {
    return this._priority;
  }

  set priority(value) {
    this._priority = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }

  get complete() {
    return this._complete;
  }

  toogleComplete() {
    this._complete = !this._complete
  }

  get projectId() {
    return this._projectId 
  }

  set projectId(value) {
    this._projectId = value
  }
}

export function subscribeToInitialTaskEvents(){
  PubSub.subscribe(EVENTS.TASK_ADDED, taskManager.addTask)
  PubSub.subscribe(EVENTS.TASK_LIST_UPDATE, displayAllTasks)
  PubSub.subscribe(EVENTS.TASK_DELETED, taskManager.deleteTask)
}

