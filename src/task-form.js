import PubSub from "./utils/pubsub";
import { Task } from "./models/task-factory";
import { EVENTS } from "./utils/constants";
import { populateSelectProject } from "./UI";

export const taskForm = {
  setupAddTaskEventListener() {
    const taskModal = document.getElementById('task-dialog')
    const addTaskBtn = document.getElementById('add-task') 
    const form = document.getElementById('task-form') 
    const addTaskBtnSecond = document.getElementById('add-task-secondary')
    const cancelXBtn = document.getElementById('cancel-task-x')
    
    const onAddTaskClick = () => {
      populateSelectProject('task-project')
      taskModal.showModal();
    }

    const onCancelClick = () => {
      taskModal.close();
      form.reset();
    }

    const onSubmit = (e) => {
      e.preventDefault();
      taskForm.add();
      taskModal.close();
      form.reset();
    }

    addTaskBtn.addEventListener('click', onAddTaskClick)
    addTaskBtnSecond.addEventListener('click', onAddTaskClick)
    form.querySelector('#cancel-new-task').addEventListener('click', onCancelClick)
    cancelXBtn.addEventListener('click', onCancelClick)
    form.addEventListener('submit', onSubmit)
  },

  add() {
    let title = document.querySelector('#task-title').value
    let description = document.querySelector('#task-description').value
    let date = document.querySelector('#task-date').value
    let priority = document.querySelector('#task-priority').value
    let project = document.querySelector('#task-project').value
    const task = new Task(title, date, priority, description, project)
    PubSub.publish(EVENTS.TASK_ADDED, task)
  },
}
