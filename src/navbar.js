import renderProjectForm from "./projectForm";
export default function (projects) {
  const leftContainer = document.querySelector(".left-container");
  addTodaySection(leftContainer);
  addProjectsSection(leftContainer, projects);
}

function addTodaySection(parent) {
  const todayHeader = createHeaderForSection("today", "Today");
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
  for (const project of projects) {
    const myProject = document.createElement("li");
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
