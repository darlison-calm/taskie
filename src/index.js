import { projectForm } from "./project-form";
import { taskForm } from "./task-form";
import { initializeNavigation, subscribeToProjectEvents, subscribeToInitialTaskEvents, renderTasks, renderProjectList} from "./application";
import { loadProjectState, loadTaskState, saveProjectState, saveTaskState } from "./storageManager";

saveTaskState()
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
