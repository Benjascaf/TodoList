import storedProjects from "./storedProjects";
import getAddTaskForm from "./addTaskForm";
import displaySectionForm from "./sectionForm.js";
import { format } from "date-fns";
export { addTaskToProjectSection };
let _mainContainer;
let _project;
export default function renderProjectSection(mainContainer, project) {
  _mainContainer = mainContainer;
  _project = project;
  mainContainer.innerHTML = "";
  const headerContainer = document.createElement("div");
  headerContainer.classList.add("project-header-container");
  addProjectHeader(headerContainer, project.getProjectName());
  const sectionButton = document.createElement("button");
  sectionButton.classList.add("section-btn");
  sectionButton.textContent = "New section";
  sectionButton.addEventListener("click", () =>
    displaySectionForm(_mainContainer).displayForm(project.getProjectName())
  );
  headerContainer.appendChild(sectionButton);
  mainContainer.appendChild(headerContainer);
  for (const subsection of project.getSubsections()) {
    addSection(
      subsection,
      mainContainer,
      project.getSubsectionTasks(subsection)
    );
  }
}
export { addSection, appendTasks };
const addProjectHeader = (parent, projectName) => {
  const header = document.createElement("h1");
  header.classList.add("project-title");
  header.textContent = projectName;
  parent.append(header);
};
const addSection = (section, parent, tasks) => {
  const sectionContainer = document.createElement("div");
  sectionContainer.classList.add("section");
  addSectionHeader(section, sectionContainer);
  appendTasks(sectionContainer, tasks, section);
  appendAddButton(sectionContainer, section);
  parent.appendChild(sectionContainer);
};

const addSectionHeader = (section, parent) => {
  if (section !== "default") {
    const sectionHeader = document.createElement("h2");
    sectionHeader.classList.add("section-title");
    sectionHeader.textContent = section;
    parent.appendChild(sectionHeader);
  }
};

const appendTasks = (parent, tasks, section) => {
  const tasksContainer = document.createElement("ul");
  tasksContainer.classList.add("todo-container");
  for (const task of tasks) {
    appendTask(tasksContainer, task, section);
  }
  parent.appendChild(tasksContainer);
};

const appendTask = (parent, task, section) => {
  const taskContainer = document.createElement("li");
  taskContainer.classList.add("todo");

  const taskButton = document.createElement("button");
  taskButton.classList.add("todo-btn");
  taskButton.dataset.priority = task.getPriority();
  taskButton.addEventListener("click", () => {
    storedProjects.removeTaskFromProjectSubsection(
      _project.getProjectName(),
      section,
      task.getTitle()
    );
    renderProjectSection(_mainContainer, _project);
  });

  const taskContentContainer = document.createElement("div");
  taskContentContainer.classList.add("todo-content");

  const taskHeader = document.createElement("h4");
  taskHeader.classList.add("todo-header");
  taskHeader.textContent = task.getTitle();

  const taskDate = document.createElement("p");
  taskDate.classList.add("todo-date");
  taskDate.textContent = task.getDueDate();

  const taskTrashContainer = document.createElement("div");
  taskTrashContainer.classList.add("trash-container");
  const taskTrash = document.createElement("i");
  taskTrash.classList.add("fa-solid", "fa-trash");
  taskTrashContainer.appendChild(taskTrash);
  taskTrashContainer.addEventListener("click", () => {
    _project.removeTaskFromSubsection(section, task.getTitle());
    storedProjects.updateLocale();
    renderProjectSection(_mainContainer, _project);
  });

  const editContainer = document.createElement("div");
  editContainer.classList.add("edit-container");
  editContainer.addEventListener("click", () => displayEditTaskDialogue(task));
  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-regular", "fa-pen-to-square");
  editContainer.appendChild(editIcon);

  taskContentContainer.append(taskHeader, taskDate);

  taskContainer.append(
    taskButton,
    taskContentContainer,
    taskTrashContainer,
    editContainer
  );

  parent.append(taskContainer);
};

const appendAddButton = (parent, section) => {
  const buttonContainer = document.createElement("li");
  buttonContainer.classList.add("add-todo");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-plus");

  const text = document.createElement("p");
  text.textContent = "Add todo";

  const addTaskForm = getAddTaskForm(buttonContainer, section);

  buttonContainer.addEventListener("click", () =>
    buttonContainer.replaceWith(addTaskForm)
  );

  buttonContainer.append(icon, text);
  parent.append(buttonContainer);
};

const addTaskToProjectSection = (taskForm, section) => {
  const taskTitle = taskForm.querySelector("#task-name").value;
  const taskDescription = taskForm.querySelector("#task-description").value;
  const taskDate = taskForm.querySelector("#task-date").value;
  const taskPriority = taskForm.querySelector("#task-priority").value;
  const currentProject = storedProjects.getProject(
    document.querySelector(".project-title").textContent
  );
  storedProjects.addTaskToProjectSubsection(
    currentProject,
    section,
    taskTitle,
    taskDescription,
    taskDate,
    taskPriority
  );
  const mainContainer = document.querySelector(".main-container");
  renderProjectSection(mainContainer, currentProject);
};

const displayEditTaskDialogue = (task) => {
  const dialog = document.querySelector("#edit-task-dialog");

  const taskName = dialog.querySelector("#task-name-edit");
  taskName.value = task.getTitle();

  const taskDescription = dialog.querySelector("#task-description-edit");
  taskDescription.value = task.getDescription();

  const taskDate = dialog.querySelector(`#task-date-edit`);
  taskDate.value = format(new Date(), "yyyy-MM-dd");

  const taskPriority = dialog.querySelector(`#task-priority`);
  taskPriority.value = task.getPriority();

  const submitButton = dialog.querySelector("#dialog-submit-btn");
  const cancelButton = dialog.querySelector("#dialog-cancel-btn");

  cancelButton.addEventListener("click", () => dialog.close());
  submitButton.addEventListener("click", () => {
    task.setDueDate(taskDate.value);
    task.setPriority(taskPriority.value);
    task.setDescription(taskDescription.value);
    renderProjectSection(_mainContainer, _project);
    storedProjects.updateLocale();
    dialog.close();
  });

  dialog.showModal();
};
