import { sub } from "date-fns";
import Todo from "./todo.js";
export default function Project(name) {
  const _name = name;
  const getProjectName = () => _name;
  const tasksContainers = {
    default: {},
  }; //An object literal to use as a dict and store tasks directly in
  //the project or in one of the subsections

  const addSubsection = (newSubjection) => {
    tasksContainers[newSubjection] = [];
  };

  //will have to remember the task's indexes using data attributes in the DOM
  const addTaskToSubsection = (subsection, ...newTaskInfo) => {
    const newTask = Todo(...newTaskInfo);
    tasksContainers[subsection][newTask.getTitle()] = newTask;
  };

  const removeTaskFromSubsection = (subsection, taskName) => {
    if (taskName in tasksContainers) {
      delete tasksContainers[subsection][taskName];
    } else {
      alert("Attempted to remove task not found in corresponding section");
    }
  };

  const containsTask = (subsection, taskName) =>
    tasksContainers[subsection].find((task) => {
      task.getTitle === taskName;
    });

  const getSubsectionTasks = (subsection) =>
    Object.values(tasksContainers[subsection]);

  const getTodaySubsectionTasks = (subsection) => {
    const tasksInSectionDueToday = [];
    for (let task in tasksContainers[subsection]) {
      if (tasksContainers[subsection][task].isDueToday()) {
        tasksInSectionDueToday.concat(tasksContainers[subsection][task]);
      }
    }
  };

  const getTasksDueToday = () => {
    const tasksDueToday = [];
    for (let section in tasksContainers) {
      tasksDueToday.concat(getTodaySubsectionTasks(section));
    }
  };

  const getSubsections = () => Object.keys(tasksContainers);

  return {
    addSubsection,
    addTaskToSubsection,
    getSubsectionTasks,
    removeTaskFromSubsection,
    getTasksDueToday,
    getProjectName,
    getSubsections,
  };
}
