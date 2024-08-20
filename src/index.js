import { projectForm } from "./project-form";
import { taskForm } from "./task-form";
import { initializeNavigation, subscribeToProjectEvents, subscribeToInitialTaskEvents} from "./application";
//TODO: 
projectForm.setupAddProjectEventListener();
subscribeToProjectEvents();
taskForm.setupAddTaskEventListener();
subscribeToInitialTaskEvents();
initializeNavigation()
