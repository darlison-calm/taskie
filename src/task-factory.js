import PubSub from "./utils/pubsub";
import { EVENTS } from "./utils/constants";
import { displayTaskList} from "./UI";

const taskManager = (function() {
  const tasksList = []

  const addTask = (task) => {
    tasksList.push(task);
    PubSub.publish(EVENTS.TASK_LIST_UPDATE, taskManager.getTasks())
    //pubsub to ui display method  
    console.log(taskManager.getTasks());
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
  static taskIds = 0
  
  constructor(title, dueDate = '', priority = '', description, complete = '') {
    this._title = title;
    this._dueDate = dueDate;
    this._priority = priority;
    this._description = description;
    this._complete = complete;
    this._projectId = ''
    this._id = Task.taskIds++
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

//TODO
//DISPLAY TASK

export function subscribeToTaskEvents(){
  PubSub.subscribe(EVENTS.TASK_ADDED, taskManager.addTask)
  PubSub.subscribe(EVENTS.TASK_LIST_UPDATE, displayTaskList)
}

