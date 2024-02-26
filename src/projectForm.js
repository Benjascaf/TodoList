import Project from "./project.js";
import storedProjects from "./storedProjects";
import renderNavbar from "./navbar.js";
export default () => {
  const displayForm = () => {
    const projectButton = document.querySelector(".project-btn");
    const projectForm = document.createElement("form");
    projectForm.innerHTML = `
              <label for="project-name">Project Name:</label>
              <input type="text" autocomplete="off" id="project-name" placeholder="My cool Project">
              <button type="button" class="project-cancel-btn">Cancel</button>
              <button type="button" class="project-submit-btn">Add Project</button>
            `;
    projectButton.replaceWith(projectForm);
    const cancelButton = document.querySelector(".project-cancel-btn");
    cancelButton.addEventListener("click", () =>
      projectForm.replaceWith(projectButton)
    );
    const newProjectName = document.querySelector("#project-name");
    const submitButton = projectForm.querySelector(".project-submit-btn");
    submitButton.addEventListener("click", () => {
      storedProjects.addProject(Project(newProjectName.value));
      projectForm.replaceWith(projectButton);
      renderNavbar(storedProjects.getProjects());
    });
  };
  return { displayForm };
};
