export default function project() {
  const tasksContainers = {
    projectTasks: [],
  }; //An object literal to use as a dict and store tasks directly in
  //the project or in one of the subsections

  const addSubsection = (newSubjection) => {
    tasksContainers[newSubjection] = [];
  };

  //will have to remember the task's indexes using data attributes in the DOM
  const addTaskToSubsection = (subsection, newTaskIndex) =>
    tasksContainers[subsection].push(newTask);

  const removeTaskFromSubsection = (subsection, taskToRemoveIndex) =>
    delete tasksContainers[subsection][taskToRemoveIndex];

  const getSubsectionTasks = (subsection) => tasksContainers[subsection];

  return {
    addSubsection,
    addTaskToSubsection,
    getSubsectionTasks,
    removeTaskFromSubsection,
  };
}
