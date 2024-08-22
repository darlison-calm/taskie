import PubSub from "./utils/pubsub";
import { Task } from "./task-factory";
import { EVENTS } from "./utils/constants";
import { populateSelectProject } from "./UI";

export const taskForm = {

  setupAddTaskEventListener() {
    const taskModal = document.getElementById('task-dialog')
    const addTaskBtn = document.getElementById('add-task') 
    const form = document.getElementById('task-form') 
    
    addTaskBtn.addEventListener('click', () => {
      populateSelectProject('task-project')
      
      taskModal.showModal();
    })

    form.querySelector('#cancel-new-task').addEventListener('click', () => {
      taskModal.close();
      form.reset
    })

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      taskForm.add();
      taskModal.close();
      form.reset();
    })
  },

  add() {
    let title = document.querySelector('#task-title').value
    let description = document.querySelector('#task-description').value
    let date = document.querySelector('#task-date').value
    let priority = document.querySelector('#task-priority').value
    let project = document.querySelector('#task-project').value
    const task = new Task(title, date, priority, description, project)
    PubSub.publish(EVENTS.TASK_ADDED, task)
  } 
}
