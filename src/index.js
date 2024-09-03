import { projectForm } from "./project-form";
import { taskForm } from "./task-form";
import { initializeNavigation, subscribeToProjectEvents, subscribeToInitialTaskEvents, renderTasks, renderProjectList} from "./application";
import { loadProjectState, loadTaskState } from "./storageManager";
//TODO: 
loadTaskState();
loadProjectState();
projectForm.setupAddProjectEventListener();
taskForm.setupAddTaskEventListener();
initializeNavigation();
subscribeToInitialTaskEvents();
subscribeToProjectEvents();
renderTasks();
renderProjectList();


