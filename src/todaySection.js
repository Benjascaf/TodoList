import { addSection } from "./projectSection";
import storedProjects from "./storedProjects";
export default function renderTodaySection(mainContainer, tasksDueToday) {
  mainContainer.innerHTML = "";
  const sectionHeader = document.createElement("h1");
  sectionHeader.classList.add("project-title");
  sectionHeader.textContent = "Today's todos";
  mainContainer.append(sectionHeader);
  const tasksContainer = document.createElement("ul");
  tasksContainer.classList.add("todo-container");
  for (let projectName in tasksDueToday) {
    for (let section in tasksDueToday[projectName]) {
      for (let task of tasksDueToday[projectName][section]) {
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

        taskContentContainer.append(taskHeader, taskDate);

        const taskTrashContainer = document.createElement("div");
        taskTrashContainer.classList.add("trash-container");
        const taskTrash = document.createElement("i");
        taskTrash.classList.add("fa-solid", "fa-trash");
        taskTrashContainer.appendChild(taskTrash);
        taskTrashContainer.addEventListener("click", () => {
          storedProjects.removeTaskFromProjectSubsection(
            projectName,
            section,
            task.getTitle()
          );
        });
        taskContainer.append(
          taskButton,
          taskContentContainer,
          taskTrashContainer
        );
        tasksContainer.append(taskContainer);
      }
    }
  }
  mainContainer.appendChild(tasksContainer);
}
