import PubSub from "./utils/pubsub";
import {Task} from "./task-factory";
import { EVENTS } from "./utils/constants";
export const taskForm = {
  
  setupAddTaskEventListener() {
    const taskModal = document.getElementById('task-dialog')
    const addTaskBtn = document.getElementById('add-task') 
    const form = document.getElementById('task-form') 
    
    addTaskBtn.addEventListener('click', () => {
      taskModal.showModal();
      //set date placeholder to today's date  
      document.getElementById('task-date').valueAsDate = new Date();
    })

    form.querySelector('#cancel-new-task').addEventListener('click', () => taskModal.close())
    form.addEventListener('submit', (e) => {
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
    
    const task = new Task(title, date, priority, description)
    
    PubSub.publish(EVENTS.TASK_ADDED, task)
  }

  
}
