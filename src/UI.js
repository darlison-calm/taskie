import Pubsub from "./utils/pubsub"
import { EVENTS } from "./utils/constants";
import { addDomElement } from "./utils/addDomElement";
import { format} from "date-fns";
import { taskManager } from "./task-factory";
import { projectsManager } from "./project";

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
        'data-index': pro,
        'title': pro
      }
    });
    
    projectItem.addEventListener('click', (e) => {
      manageActiveBtnStyle(e.target)
      const projectName = e.target.getAttribute('data-index')
      projectsManager.setCurrentProject(projectName)
      displayTasks(taskManager.getTasksByProjectId(projectsManager.getCurrentProject()))
    })

    projectsContainer.append(projectItem);
  });
}

function displayTask(task, tasksContainer) {
  
  const itemTask = addDomElement({
    tag: 'li',
    className: 'list-group-item',
  })

  const checkbox = addDomElement({
    tag: 'input',
    className: 'input-checkbox',
    attr: {
      type: 'checkbox',
      name: 'task-status'
    }
  })
  
  checkbox.addEventListener('change', function() {
    updateTaskCompletion(this.checked, task, title, btnEditIcon, priority, date, description);
  })
  
  const taskDeatils = addDomElement({
    tag: 'div',
    className: 'task-details',
  })

  const title = addDomElement({
    tag: 'h6',
    className: task.complete ? 'completed' : '',
    textContent: task.title
  })

  const description = addDomElement({
    tag: 'p',
    className: 'task-description',
    textContent: task.description, 
  })

  const taskButtons = addDomElement({
    tag: 'div'
  })

  const btnDelete = addDomElement({
    tag: 'button',
    className: 'btn-delete-task',
    attr: {
      'title': 'Delete Task'
    }
  });
 
  const btnDeleteIcon = addDomElement({
    tag: 'i',
    className: ["fa-solid", "fa-xmark", "fa-lg"],
    attr: {
      'data-id': task.id
    }
  });

  btnDelete.appendChild(btnDeleteIcon);  

  btnDelete.addEventListener('click', (e) => {
    const index = Number(e.target.dataset.id)
    Pubsub.publish(EVENTS.TASK_DELETED, index)
  })

  const btnEdit = addDomElement({
    tag : 'button',
    className: 'btn-edit-task',
    attr : {
      'title' : 'Edit task'
    }
  })

  const btnEditIcon = addDomElement({
    tag: 'i',
    className : ['fa-solid', 'fa-pen-to-square', 'fa-lg'],
    attr : {
      'data-id' : task.id
    }
  })
  
  btnEdit.appendChild(btnEditIcon);

  const priority = addDomElement({
    tag: 'p',
    className: 'task-priority',
    textContent: `Priority: ${task.priority}`
  })

  const dateString = new Date(task.dueDate.replace(/-/g, '/'))
  
  const date = addDomElement({
    tag: 'p',
    className: 'task-due-date',
    textContent: `Due date: ${format(dateString, 'MMM d, yyyy')}`
  })

  const divFlex = addDomElement({
    tag: 'div',
    className: 'd-flex'
  }) 

  const divFlexSecond = addDomElement({
    tag: 'div',
    className: 'd-flex'
  })
  
  checkbox.checked = task.complete


  itemTask.appendChild(checkbox)

  taskButtons.appendChild(btnEdit)
  taskButtons.appendChild(btnDelete)
  
  divFlex.appendChild(title)
  divFlex.appendChild(taskButtons)

  divFlexSecond.appendChild(date)
  divFlexSecond.appendChild(priority)
  
  taskDeatils.appendChild(divFlex)
  taskDeatils.appendChild(description)
  taskDeatils.appendChild(divFlexSecond)
  
  itemTask.appendChild(taskDeatils)
  tasksContainer.appendChild(itemTask)
}

export function displayTasks(tasks) {
  const list = document.querySelector('#task-list');
  list.innerHTML = '' 
  tasks.forEach(task => displayTask(task, list))
}

export function manageActiveBtnStyle(button) {
  document.querySelectorAll('.button-nav').forEach(btn => btn.classList.remove('button-active'));
  document.querySelectorAll('.btn-projects').forEach(btn => btn.classList.remove('button-active'));
  button.classList.add('button-active')
}

export function populateSelectProject(container) {
  const select = document.getElementById(container);
  select.innerHTML = ''

  const items = projectsManager.getProjects()
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

function updateTaskCompletion(isChecked, task, ...elements) {
  task.toggleComplete()

  elements.forEach(e => {
    if (isChecked) {
      e.classList.add('completed')
    } else {
      e.classList.remove('completed')
    }
  })
}