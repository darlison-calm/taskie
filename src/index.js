import { projectForm } from "./project-form";
import { taskForm } from "./task-form";
import { initializeNavigation, subscribeToProjectEvents, subscribeToInitialTaskEvents, renderTasks, renderProjectList} from "./application";
import { loadProjectState, loadTaskState} from "./storageManager";

loadTaskState();
loadProjectState();
projectForm.setupAddProjectEventListener();
taskForm.setupAddTaskEventListener();

initializeNavigation();
subscribeToInitialTaskEvents();
subscribeToProjectEvents();

renderTasks();
renderProjectList();

window.addEventListener("load", () => {
  if(window.innerWidth <= 768)
    closeNav()
})
// TODO:
//Add sibe bar
//toogles side bar