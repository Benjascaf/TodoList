import renderNavbar from "./navbar.js";
import Project from "./project.js";
import renderProjectSection from "./projectSection.js";
import renderTodaySection from "./todaySection.js";
import storedProjects from "./storedProjects.js";
import renderProjectForm from "./projectForm.js";
const project = Project("My Project");
storedProjects.addProject(project);
project.addSubsection("My subsection");
for (let i = 0; i < 5; i++) {
  project.addTaskToSubsection(
    "default",
    "Clean The house",
    "o",
    "August 24",
    "3"
  );
}
for (let i = 0; i < 5; i++) {
  project.addTaskToSubsection(
    "My subsection",
    "Clean The house",
    "o",
    "August 24",
    "3"
  );
}
storedProjects.addProject(project);
renderNavbar(storedProjects.getProjects());
