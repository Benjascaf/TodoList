export default (() => {
  const _projects = {};
  const addProject = (project) => {
    const projectName = project.getProjectName();
    if (projectName in Object.keys(_projects)) {
      alert("Two different projects can't have the same name!");
    } else {
      _projects[projectName] = project;
    }
  };

  const removeProject = (project) => {
    delete _projects[project];
  };

  const getProjects = () => Object.values(_projects);

  const getProject = (project) => _projects[project];

  return {
    removeProject,
    getProjects,
    addProject,
    getProject,
  };
})();
