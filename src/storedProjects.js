import Project from "./project";

export default (() => {
  const _projects = getStoredProjects();

  function getStoredProjects() {
    let projects = {};
    if (localStorage.length === 0) {
      projects = { "My First Project": Project("My First Project") };
      projects["My First Project"].addTaskToSubsection("default", [
        "My first task",
        "ddd",
        new Date(),
        "3",
      ]);
      localStorage.setItem(
        "My First Project",
        JSON.stringify(projects["My First Project"])
      );
    } else {
      for (let projectName of Object.keys(localStorage)) {
        projects[projectName] = Project(projectName);
        const sections = JSON.parse(localStorage.getItem(projectName));
        for (let section in sections) {
          projects[projectName].addSubsection(section);
          for (let task in sections[section]) {
            projects[projectName].addTaskToSubsection(section, [
              sections[section][task].title,
              sections[section][task].description,
              sections[section][task].date,
              sections[section][task].priority,
            ]);
          }
        }
      }
    }
    return projects;
  }
  const addProject = (project) => {
    const projectName = project.getProjectName();
    if (!localStorage.getItem(projectName)) {
      localStorage.setItem(projectName, JSON.stringify(project));
      _projects[projectName] = project;
    } else {
      alert("Two different projects can't have the same name!");
    }
  };

  const removeProject = (project) => {
    delete _projects[project.getProjectName()];
    delete localStorage[project.getProjectName()];
  };

  const getProjects = () => Object.values(_projects);

  const getProject = (projectName) => {
    return _projects[projectName];
  };

  const getTasksDueToday = () => {
    let tasksDueToday = {};
    for (let projectName in _projects) {
      tasksDueToday[projectName] = _projects[projectName].getTasksDueToday();
    }
    return tasksDueToday;
  };

  const addTaskToProjectSubsection = (project, subsection, ...newTaskInfo) => {
    _projects[project.getProjectName()].addTaskToSubsection(
      subsection,
      newTaskInfo
    );
    localStorage.setItem(project.getProjectName(), JSON.stringify(project));
  };

  const updateLocale = () => {
    for (let projectName in _projects) {
      localStorage.setItem(projectName, JSON.stringify(_projects[projectName]));
    }
  };

  const addSubsectionToProject = (subsection, projectName) => {
    _projects[projectName].addSubsection(subsection);
    localStorage.setItem(projectName, JSON.stringify(_projects[projectName]));
  };

  const removeTaskFromProjectSubsection = (
    projectName,
    subsection,
    taskName
  ) => {
    _projects[projectName].removeTaskFromSubsection(subsection, taskName);
    localStorage.setItem(projectName, JSON.stringify(_projects[projectName]));
  };

  return {
    removeTaskFromProjectSubsection,
    addSubsectionToProject,
    addTaskToProjectSubsection,
    updateLocale,
    removeProject,
    getProjects,
    addProject,
    getProject,
    getTasksDueToday,
  };
})();
