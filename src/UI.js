import Pubsub from "./utils/pubsub"
import { EVENTS } from "./utils/constants";
import { addDomElement } from "./utils/addDomElement";
import { isSameDay, isSameWeek, format} from "date-fns";
import { taskManager } from "./task-factory";

export function displayProjectList(projects) {
  const projectsContainer = document.getElementById("projects-container");
  projectsContainer.innerHTML = ''
  
  const projectsToDisplay = projects.slice(1);
  
  projectsToDisplay.forEach(pro => {
    const projectItem = addDomElement({
      tag: 'button',
      textContent: pro,
      className: 'btn-projects',
      attr: {
        'data-index': pro
      }
    });
   
    projectItem.addEventListener('click', (e) => {
      manageActiveBtnStyle(e.target)
      const projectIndex = e.target.getAttribute('data-index')
      displayProjectTasks(taskManager.getTasks(), projectIndex)
    })

    projectsContainer.append(projectItem);
  });
}

function displayTask(task, tasksContainer) {
  const itemTask = addDomElement({
    tag: 'div',
    className: 'task-item',
  })

  const taskInfo = addDomElement({
    tag: 'div',
    className: 'task-info',
  })

  const checkbox = addDomElement({
    tag: 'input',
    attr: {
      type: 'checkbox'
    }
  })

  checkbox.addEventListener('click', () => {
    task.toggleComplete()
    if(task.complete === true) {
      title.classList.add("completed")
      return
    }
    title.classList.remove("completed")
  })

  const divTitleAnBtn = addDomElement({
    tag : 'div',
    className : 'title-btn-container'
  })

  const title = addDomElement({
    tag: 'div',
    className: 'task-title',
    textContent: task.title,
  })

  const btnDelete = addDomElement({
    tag : 'button',
    className: 'btn-delete',
    textContent: "DELETE",
    attr: {
      'data-id' : task.id,
    }
  })
 
  btnDelete.addEventListener('click', (e) => {
    const index = Number(e.target.dataset.id)
    Pubsub.publish(EVENTS.TASK_DELETED, index)
  })

  divTitleAnBtn.appendChild(title);
  divTitleAnBtn.appendChild(btnDelete)

  const description = addDomElement({
    tag: 'span',
    className: 'task-description',
    textContent: task.description, 
  })

  const divzz = addDomElement({
    tag: 'div',
    className: 'task-priority-date'
  })

  const projectId = addDomElement({
    tag: 'span',
    className: 'task-projectId',
    textContent: task.projectId
  })

  const priority = addDomElement({
    tag: 'span',
    className: 'task-priority',
    textContent: task.priority
  })

  const dateString = new Date(task.dueDate.replace(/-/g, '/'))
  const date = addDomElement({
    tag: 'span',
    className: 'task-date',
    textContent: format(dateString, 'MMMM d, yyyy')
  })
  divzz.appendChild(date)
  divzz.appendChild(priority)
  divzz.appendChild(projectId)
  taskInfo.appendChild(divTitleAnBtn)
  taskInfo.appendChild(description)
  taskInfo.appendChild(divzz)
  itemTask.appendChild(checkbox)
  itemTask.appendChild(taskInfo)

  tasksContainer.appendChild(itemTask)
}

function clearTaskContainer(){
  const list = document.querySelector('#task-list');
  list.innerHTML = ''
  return list
}

export function displayAllTasks(tasks) {
  const list = clearTaskContainer()
  tasks.forEach(task => displayTask(task, list))
}

function displayTasksBasedOnDate(tasks, conditionFn) {
  const today = new Date();
  const todaysString = format(today, 'yyyy-MM-dd');
  const list = clearTaskContainer()
  
  const filterTasks = tasks.filter((task) => conditionFn(todaysString, task.dueDate))
  filterTasks.forEach(task => displayTask(task, list))
}

export function displayTodaysTasks(tasks) {
  const isToday = (todaysString, dueDate) => isSameDay(todaysString, dueDate);
  displayTasksBasedOnDate(tasks, isToday);
}

export function displayWeekTasks(tasks) {
  const isThisWeek = (todaysString, dueDate) => isSameWeek(todaysString, dueDate);
  displayTasksBasedOnDate(tasks, isThisWeek);
}

export function displayProjectTasks(tasks, projectName) {
  const list = clearTaskContainer()
  const filterTasks = tasks.filter(task => task.projectId === projectName)
  
  filterTasks.forEach(task => displayTask(task, list))
}

export function manageActiveBtnStyle(button) {
  document.querySelectorAll('.button-nav').forEach(btn => btn.classList.remove('button-active'));
  document.querySelectorAll('.btn-projects').forEach(btn => btn.classList.remove('button-active'));
  button.classList.add('button-active')
}

export function populateSelectProject(items) {
  const select = document.getElementById('task-project');
  select.innerHTML = ''

  items.forEach(item => {
    const option = addDomElement({
      tag : 'option',
      textContent: item,
      attr: {
        value: item
      }
    })
    select.appendChild(option)
  })
}


