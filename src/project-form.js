import PubSub from "./utils/pubsub";
import { EVENTS } from "./utils/constants";
export const projectForm = {

  setupAddProjectEventListener() {
    const projectModal = document.getElementById('project-dialog')
    const addProjectBtn = document.getElementById('add-project')
    const form = document.getElementById('project-form')
    
    addProjectBtn.addEventListener('click' , () => projectModal.showModal())
    
    form.querySelector('#cancel').addEventListener('click', () => projectModal.close())
    form.querySelector('#confirm').addEventListener('click', (ev) => {
      ev.preventDefault()
      projectForm.add()
      projectModal.close()
    })
  },

  add() {
    let input = document.querySelector('#project-name')
    let title = input.value
    input.value = ''

    PubSub.publish(EVENTS.PROJECT_ADDED, title)
  }
}