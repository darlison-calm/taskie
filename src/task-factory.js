import { isSameDay, isSameWeek } from "date-fns";
import { checkMatchingDate } from "./application";

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

  const estudo = new Task('Estudar Matemática', '2024-09-03', 'ALTA', 'Por duas horas', 'Inbox')

  const presentes = new Task('Comprar Presentes', '2024-12-15', 'MÉDIA', 'Comprar presentes de Natal para a família', 'Inbox');

  const relatorio = new Task('Revisar Relatório', '2024-09-10', 'ALTA', 'Revisar e corrigir erros no relatório trimestral', 'Trabalho');

  const exercicios = new Task('Fazer Exercícios','2024-09-04', 'BAIXA', 'Caminhar por uma hora no parque', 'Saúde');

  const baixa = new Task('Fazer a casa', '2024-09-04', 'BAIXA', '' , 'Inbox')

  const viagem = new Task('Planejar Viagem', '2024-11-01', 'MÉDIA', 'Pesquisar e reservar voos e hotéis para as férias', 'Inbox');

  const exame = new Task('Estudar para Exame', '2024-10-20', 'ALTA', 'Estudar todos os tópicos do exame final de física', 'Inbox');

  exame.complete = true
  viagem.complete = true
  relatorio.complete = true

export const taskManager = (function() {
  const tasksList = [relatorio,viagem]
 
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
      default : tasksList.filter(task => task.projectId === projectId)
    }

    let sortedTasks = filters[projectId] || filters.default
    sortedTasks = changeOrderByComplete(sortedTasks)
    return sortedTasks
  }

  const deleteTask = (taskId) => {
    const index = tasksList.findIndex(task => task.id === taskId);
    if (index !== -1) {
      tasksList.splice(index, 1);    
    } else {
        console.error(`Task with id ${taskId} not found.`);
    }
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

 
