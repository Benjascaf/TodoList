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
    tasksContainers[newSubjection] = {};
  };

  const addTaskToSubsection = (subsection, newTaskInfo) => {
    const newTask = Todo(
      newTaskInfo[0],
      newTaskInfo[1],
      newTaskInfo[2],
      newTaskInfo[3]
    );
    tasksContainers[subsection][newTask.getTitle()] = newTask;
  };

  const removeTaskFromSubsection = (subsection, taskName) => {
    if (taskName in tasksContainers[subsection]) {
      delete tasksContainers[subsection][taskName];
    } else {
      alert("Attempted to remove task not found in corresponding section");
    }
  };

  const getSubsectionTasks = (subsection) =>
    Object.values(tasksContainers[subsection]);

  const getTodaySubsectionTasks = (subsection) => {
    const tasksInSectionDueToday = [];
    for (let task in tasksContainers[subsection]) {
      if (tasksContainers[subsection][task].isDueToday()) {
        tasksInSectionDueToday.push(tasksContainers[subsection][task]);
      }
    }
    return tasksInSectionDueToday;
  };

  const getTasksDueToday = () => {
    let tasksDueToday = {};
    for (let section in tasksContainers) {
      tasksDueToday[section] = getTodaySubsectionTasks(section);
    }
    return tasksDueToday;
  };

  const getSubsections = () => Object.keys(tasksContainers);

  const toJSON = () => {
    const sections = {};
    for (let section of Object.keys(tasksContainers)) {
      sections[section] = tasksContainers[section];
    }
    return sections;
  };

  return {
    toJSON,
    addSubsection,
    addTaskToSubsection,
    getSubsectionTasks,
    removeTaskFromSubsection,
    getTasksDueToday,
    getProjectName,
    getSubsections,
  };
}
