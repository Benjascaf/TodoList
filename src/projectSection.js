export default function renderProjectSection(mainContainer, project) {
  mainContainer.innerHTML = "";
  addProjectHeader(mainContainer, project.getProjectName());
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
  appendTasks(sectionContainer, tasks);
  appendAddButton(sectionContainer);
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

const appendTasks = (parent, tasks) => {
  const tasksContainer = document.createElement("ul");
  tasksContainer.classList.add("todo-container");
  for (const task of tasks) {
    appendTask(tasksContainer, task);
  }
  parent.appendChild(tasksContainer);
};

const appendTask = (parent, task) => {
  const taskContainer = document.createElement("li");
  taskContainer.classList.add("todo");

  const taskButton = document.createElement("button");
  taskButton.classList.add("todo-btn");
  taskButton.dataset.priority = task.getPriority();
  taskButton.addEventListener("click", () =>
    taskButton.classList.contains("checked")
      ? taskButton.classList.remove("checked")
      : taskButton.classList.add("checked")
  );

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

const appendAddButton = (parent) => {
  const buttonContainer = document.createElement("li");
  buttonContainer.classList.add("add-todo");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-plus");

  const text = document.createElement("p");
  text.textContent = "Add todo";

  const addTaskForm = getAddTaskForm(buttonContainer);

  buttonContainer.addEventListener("click", () =>
    buttonContainer.replaceWith(addTaskForm)
  );

  buttonContainer.append(icon, text);
  parent.append(buttonContainer);
};

const getAddTaskForm = (addTaskButton) => {
  const addTaskForm = document.createElement("form");
  addTaskForm.classList.add("add-task-form");
  addTaskForm.autocomplete = "off";
  addTaskForm.innerHTML = `<div class="form-top">
  <div class="task-name-container">
    <label for="task-name">Task Name:</label>
    <input
      type="text"
      placeholder="Task Name"
      id="task-name"
      required
    />
  </div>
  <div class="task-description-container">
    <label for="task-description">Task description:</label>
    <input
      type="text"
      id="task-description"
      placeholder="Task description"
      required
    />
  </div>
  <div class="task-date-container">
    <label for="task-date">Due Date:</label>
    <input type="date" id="task-date" required />
  </div>
  <div class="task-priority-container">
    <select name="priority" required>
      <option value="1">Priority 1</option>
      <option value="2">Priority 2</option>
      <option value="3">Priority 3</option>
      <option value="4">Priority 4</option>
    </select>
  </div>
</div>
<div class="form-bottom">
  <div class="project-selector-container">
    <select name="project" id="">
      <option value="">My project</option>
      <option value="">My project</option>
      <option value="">My project</option>
    </select>
  </div>
  <div class="buttons-container">
    <button type="button" class="cancel-btn">Cancel</button>
    <button type="button" class="sumbmit-btn">Add task</button>
  </div>
</div>`;

  addTaskForm
    .querySelector(".cancel-btn")
    .addEventListener("click", () => addTaskForm.replaceWith(addTaskButton));
  return addTaskForm;
};

const displayEditTaskDialogue = (task) => {
  const dialog = document.querySelector("#edit-task-dialog");

  const taskName = dialog.querySelector("#task-name-edit");
  taskName.value = task.getTitle();

  const taskDescription = dialog.querySelector("#task-description-edit");
  taskDescription.value = task.getDescription();

  const taskDate = dialog.querySelector(`#task-date-edit`);
  taskDate.value = task.getDueDate();

  const taskPriority = dialog.querySelector(`#task-priority`);
  taskPriority.value = task.getPriority();

  const submitButton = dialog.querySelector("#dialog-submit-btn");
  const cancelButton = dialog.querySelector("#dialog-cancel-btn");

  cancelButton.addEventListener("click", () => dialog.close());

  dialog.showModal();
};
