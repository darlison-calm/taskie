export const projectsManager = (function() {
  const projects = ['Inbox']

  const addProject = (project) => {
    const alreadyExist = projects.some(pro => pro === project)
    if (alreadyExist) {
      alert('project already exist')
      return
    }
    projects.push(project)
  }
  
  const deleteProject = (index) => projects.splice(index, 1)

  const getProjects = () => projects

  return {
    addProject,
    deleteProject,
    getProjects
  }
})()




