import PubSub from "./utils/pubsub";
import { EVENTS } from "./utils/constants";

const taskManager = (function() {
  const tasksList = []

  const addTask = (task) => {
    tasksList.push(task);
    console.log(getTasks());
  }

  const getTasks = () => {
    return tasksList
  }

  return {
    addTask,
    getTasks
  }

})()

export class Task {
  static todoIds = 0
  
  constructor(title, dueDate, priority, description, complete) {
    this._title = title;
    this._dueDate = dueDate;
    this._priority = priority;
    this._description = description;
    this._complete = complete;
    this._projectId = ''
    this._id;
    this.giveId()
  }
 
  giveId(){
    this._id = Task.todoIds++
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

  togleComplete() {
    this._complete = !this._complete
  }

  get projectId() {
    return this._projectId = value
  }

  set projectId(value) {
    this._projectId = value
  }
}

export function subscribeToTaskEvents(){
  PubSub.subscribe(EVENTS.TASK_ADDED, taskManager.addTask)
}

