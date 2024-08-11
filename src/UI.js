
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
      'data-index' : task.id,
    }
  })

  title.appendChild(btnDelete);

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

  taskInfo.appendChild(title)
  taskInfo.appendChild(description)
  taskInfo.appendChild(divzz)
  
  itemTask.appendChild(checkbox)
  itemTask.appendChild(taskInfo)

  tasksContainer.appendChild(itemTask)
}

export function displayTaskList(tasks) {
  const list = document.querySelector('#task-list');
  list.innerHTML = ''
  tasks.forEach(task => {
   displayTask(task, list)
  })
}


