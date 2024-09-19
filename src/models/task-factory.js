import { isSameDay, isSameWeek } from "date-fns";
import { checkMatchingDate } from "../application";

export class Task {
  constructor(title, dueDate = '', priority = '', description, projectId) {
    this._title = title;
    this._dueDate = dueDate;
    this._priority = priority;
    this._description = description;
    this._complete = false;
    this._projectId = projectId;
    this._id = Task.generateId()
  }
  static taskId = 0

  static generateId() {
    return Task.taskId++;
  }

  set id(value) {
    this._id = value;
  }

  get id() {
    return this._id
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

  set complete(value) {
    this._complete = value
  }

  get projectId() {
    return this._projectId;
  }

  set projectId(value) {
    this._projectId = value;
  }
}

  
export const taskManager = (function() {
  const tasksList = []
 
  const addTask = (task) => {
    tasksList.push(task);
  }

  const getAllTasks = () => {
    return tasksList
  }

  const getTasksByProjectId = (projectId) => {
    const filters = {
      'Today' : tasksList.filter(task => checkMatchingDate(task.dueDate, isSameDay)),
      'Week' : tasksList.filter(task => checkMatchingDate(task.dueDate, isSameWeek)),
      'Hoje' : tasksList.filter(task => checkMatchingDate(task.dueDate, isSameDay)),
      'Semana' : tasksList.filter(task => checkMatchingDate(task.dueDate, isSameWeek)),
      default : tasksList.filter(task => task.projectId === projectId)
    }

    let sortedTasks = filters[projectId] || filters.default
    sortedTasks = changeOrderByComplete(sortedTasks)
    return sortedTasks
  }

  const deleteTask = (taskId) => {
    const index = tasksList.findIndex(task => task.id === taskId);
    tasksList.splice(index, 1);    
  }

  const getTaskById = (taskId) => {
    const index = tasksList.findIndex(task => task.id === taskId);
    return tasksList[index];
  }

  const editTask = (newTask, oldTaskId) => {
    const index = tasksList.findIndex(task => task.id === oldTaskId);
    tasksList[index] = newTask
  }

  const changeOrderByComplete = (tasks) => {
    const uncompleted = tasks.filter(t => t.complete === false)
    const completed = tasks.filter(t => t.complete === true)
    return uncompleted.concat(completed)
  }

  const setTasks = (tasks) => {
    tasksList.length = 0;
    tasksList.push(...tasks);
  }

  return {
    addTask,
    getAllTasks,
    deleteTask,
    getTasksByProjectId,
    getTaskById,
    editTask,
    setTasks
  }
})()

 
