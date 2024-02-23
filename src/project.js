import Todo from "todo.js";
export default function Project() {
  const tasksContainers = {
    projectTasks: [],
  }; //An object literal to use as a dict and store tasks directly in
  //the project or in one of the subsections

  const addSubsection = (newSubjection) => {
    tasksContainers[newSubjection] = [];
  };

  //will have to remember the task's indexes using data attributes in the DOM
  const addTaskToSubsection = (subsection, ...newTaskInfo) =>
    tasksContainers[subsection].push(Todo(...newTaskInfo));

  const removeTaskFromSubsection = (subsection, taskToRemoveIndex) => {
    if (containsTask(subsection, taskName)) {
      delete tasksContainers[subsection][taskToRemoveIndex];
    } else {
      alert("Attempted to remove task not found in corresponding section");
    }
  };

  const containsTask = (subsection, taskName) =>
    tasksContainers[subsection].find((task) => {
      task.getTitle === taskName;
    });

  const getSubsectionTasks = (subsection) => tasksContainers[subsection];

  const getTodaySubsectionTasks = (subsection) =>
    tasksContainers[subsection].filter((task) => task.isDueToday());

  const getTasksDueToday = () => {
    const tasksDueToday = [];
    for (let key in tasksContainers) {
      tasksDueToday.concat(getTodaySubsectionTasks(key));
    }
  };

  return {
    addSubsection,
    addTaskToSubsection,
    getSubsectionTasks,
    removeTaskFromSubsection,
    getTasksDueToday,
  };
}
