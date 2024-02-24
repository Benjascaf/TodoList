import Navbar from "./navbar.js";
import Project from "./project.js";
import renderProjectSection from "./projectSection.js";
import Todo from "./todo.js";
const projects = [];
const project = Project("My Project");
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
const mainContainer = document.querySelector(".main-container");
Navbar(projects);
renderProjectSection(mainContainer, project);
