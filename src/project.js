export const projectsManager = (function() {
  const projects = ['Inbox']

  let currentProject = projects[0];

  const addProject = (project) => {
    projects.push(project)
  }

  const getCurrentProject = () => {
    return currentProject
  }

  const setCurrentProject = (id) => {
    currentProject = id
  }
  
  const deleteProject = (index) => projects.splice(index, 1)

  const getProjects = () => projects

  const setProjects = (values) => {
    projects.length = 0
    if (values.includes('Inbox')) {
      projects.push(...values);
    } else {
      projects.push('Inbox')
      projects.push(...values)
    }
  }

  return {
    addProject,
    deleteProject,
    getProjects,
    getCurrentProject,
    setCurrentProject,
    setProjects
  }
})()




