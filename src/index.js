import { projectForm } from "./project-form";
import { taskForm } from "./task-form";
import { initializeNavigation, subscribeToProjectEvents, subscribeToInitialTaskEvents, renderTasks, renderProjectList} from "./application";
import { loadProjectState, loadTaskState, saveProjectState} from "./storageManager";
import { closeNav, openNav } from "./UI";

const toogleSideBtn = document.querySelector(".fa-bars")

toogleSideBtn.addEventListener("click" , () => {
  const sidebar = document.querySelector(".sidebar");
  if (sidebar.classList.contains("toogle-sidebar")) {
    openNav();
  } else {
    closeNav();
  }
})

loadTaskState();
saveProjectState()
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
  {
    closeNav()
  }
})
// TODO:
//Add sibe bar
//toogles side bar