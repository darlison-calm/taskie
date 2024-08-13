import Pubsub from "./utils/pubsub"
import { EVENTS } from "./utils/constants";
import { addDomElement } from "./utils/addDomElement";
import { format } from "date-fns";

export function displayProjectList(projects) {
  const projectsContainer = document.getElementById("projects-container");
  projectsContainer.innerHTML = ''

  projects.forEach(pro => {
    let projectItem = addDomElement({
      tag: 'button',
      textContent: pro,
      className: 'btn-projects',
      attr: {
        'data-index': `${pro} Project`
      }
    });

    projectsContainer.append(projectItem);
  });
}



function displayTask(task, tasksContainer, position) {
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
    task.toogleComplete()
    if(task.complete === true) {
      title.classList.add("completed")
      return
    }
    title.classList.remove("completed")
  })

  const divTitleAnBtn = addDomElement({
    tag : 'div',
    className : 'task-priority-date'
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
      'data-index' : position,
    }
  })

  btnDelete.addEventListener('click', (e) => {
    const index = Number(e.target.dataset.index)
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

  taskInfo.appendChild(divTitleAnBtn)
  taskInfo.appendChild(description)
  taskInfo.appendChild(divzz)
  
  itemTask.appendChild(checkbox)
  itemTask.appendChild(taskInfo)

  tasksContainer.appendChild(itemTask)
}

export function displayTaskList(tasks) {
  const list = document.querySelector('#task-list');
  list.innerHTML = ''
  tasks.forEach((task, index) => {
   displayTask(task, list, index)
  })
}


