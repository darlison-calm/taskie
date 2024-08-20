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
        'data-index': pro
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
    attr: {
      type: 'checkbox',
      name: 'task-status'
    }
  })
  
  checkbox.addEventListener('change', function() {
    if (this.checked) {
      task.toggleComplete()
      title.classList.add("completed")
    } else {
      task.toggleComplete()
      title.classList.remove("completed")
    }
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

  const btnDelete = addDomElement({
    tag : 'button',
    className: 'btn-delete',
    textContent: "DEL",
    attr: {
      'data-id' : task.id,
      'title': 'Delete Task'
    }
  })

  btnDelete.addEventListener('click', (e) => {
    const index = Number(e.target.dataset.id)
    Pubsub.publish(EVENTS.TASK_DELETED, index)
  })

  const project = addDomElement({
    tag: 'p',
    className: 'task-projectId',
    textContent: task.projectId
  })

  const priority = addDomElement({
    tag: 'p',
    className: 'task-priority',
    textContent: task.priority
  })

  const dateString = new Date(task.dueDate.replace(/-/g, '/'))
  
  const date = addDomElement({
    tag: 'p',
    className: 'task-due-date',
    textContent: format(dateString, 'MMMM d, yyyy')
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
  
  divFlex.appendChild(title)
  divFlex.appendChild(btnDelete)

  divFlexSecond.appendChild(date)
  divFlexSecond.appendChild(priority)
  divFlexSecond.appendChild(project)
  
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
