import PubSub from "./utils/pubsub";
import {Task} from "./task-factory";
import { EVENTS } from "./utils/constants";
export const taskForm = {
  
  setupAddTaskEventListener() {
    const taskModal = document.getElementById('task-dialog')
    const addTaskBtn = document.getElementById('add-task') 
    const form = document.getElementById('task-form')
    console.log(taskModal, addTaskBtn, form); 
    
    addTaskBtn.addEventListener('click', () => taskModal.showModal())

    form.querySelector('#cancel-new-task').addEventListener('click', () => taskModal.close())
    form.querySelector('#confirm-new-task').addEventListener('click', (e) => {
      e.preventDefault()
      taskForm.add()
      taskModal.close()
    })
  },

  add() {
    let title = document.querySelector('#task-title').value
    let description = document.querySelector('#task-description').value
    let date = document.querySelector('#task-date').value
    let priority = document.querySelector('#task-priority').value

    const task = new Task(title, description, date, priority)
    PubSub.publish(EVENTS.TASK_ADDED, task)
  }
}
