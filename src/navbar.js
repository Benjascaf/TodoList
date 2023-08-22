export default function (projects) {
  const leftContainer = document.querySelector(".left-container");
  addTodaySection(leftContainer);
  addProjectsSection(leftContainer);
  const projectsContainer = document.querySelector(".projects-list");
  for (const project in projects) {
    const myProject = document.createElement("li");
    myProject.classList.add(project.getName());
    projectsContainer.append(myProject);
  }
}

function addTodaySection(parent) {
  const container = document.createElement("div");
  container.classList.add("today-section", "header");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-rocket");

  const todayHeader = document.createElement("h1");
  todayHeader.textContent = "Today";

  container.append(icon, todayHeader);
  parent.append(container);
}

function addProjectsSection(parent) {
  const container = document.createElement("div");
  container.classList.add("projects", "header");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-rocket");

  const projectsHeader = document.createElement("h1");
  projectsHeader.textContent = "My Projects";

  const projectsList = document.createElement("ul");
  projectsList.classList.add("projects-list");

  container.append(icon, projectsHeader, projectsList);
  parent.append(container);
}
