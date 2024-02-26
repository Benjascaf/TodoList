import renderProjectForm from "./projectForm";
import storedProjects from "./storedProjects";
import renderProjectSection from "./projectSection";
import renderTodaySection from "./todaySection";
export default function renderNavbar(projects) {
  const leftContainer = document.querySelector(".left-container");
  leftContainer.innerHTML = "";
  addTodaySection(leftContainer);
  addProjectsSection(leftContainer, projects);
}

function addTodaySection(parent) {
  const mainContainer = document.querySelector(".main-container");
  const todayHeader = createHeaderForSection("today", "Today");
  todayHeader.addEventListener("click", () =>
    renderTodaySection(
      mainContainer,
      project.getSubsectionTasks("My subsection")
    )
  );
  parent.append(todayHeader);
}

function addProjectsSection(parent, projects) {
  const container = document.createElement("div");
  container.classList.add("projects-container");
  const headerContainer = createHeaderForSection("projects", "My Projects");
  const projectsList = document.createElement("ul");
  projectsList.classList.add("projects-list");
  addProjects(projects, projectsList);
  appendProjectButton(projectsList);
  container.append(headerContainer, projectsList);
  parent.append(container);
}

function createHeaderForSection(section, headerTitle) {
  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-rocket");
  const headerContainer = document.createElement("div");
  const projectsHeader = document.createElement("h1");
  headerContainer.classList.add(section, "header");
  projectsHeader.textContent = headerTitle;
  headerContainer.append(icon, projectsHeader);
  return headerContainer;
}

function addProjects(projects, parent) {
  const mainContainer = document.querySelector(".main-container");
  for (const project of projects) {
    const myProject = document.createElement("li");
    myProject.addEventListener("click", () => {
      renderProjectSection(
        mainContainer,
        storedProjects.getProject(project.getProjectName())
      );
    });
    myProject.classList.add("project");
    myProject.dataset.projectName = project.getProjectName();
    const header = document.createElement("h2");
    header.textContent = project.getProjectName();
    myProject.append(header);
    parent.append(myProject);
  }
}

function appendProjectButton(parent) {
  const projectButton = document.createElement("button");
  projectButton.classList.add("project-btn");
  projectButton.textContent = "New Project";
  projectButton.addEventListener("click", () =>
    renderProjectForm().displayForm()
  );
  parent.appendChild(projectButton);
}
