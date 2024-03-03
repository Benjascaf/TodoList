import Project from "./project.js";
import storedProjects from "./storedProjects";
import renderNavbar from "./navbar.js";
export default () => {
  const displayForm = () => {
    const projectButton = document.querySelector(".project-btn");
    const projectForm = document.createElement("form");
    projectForm.innerHTML = `
              <div id="project-form">
                <label for="project-name">Project Name:</label>
                <input type="text" autocomplete="off" id="project-name" placeholder="My cool Project">
              </div>
              <div id="project-form-btns">
                <button type="button" id="project-cancel-btn">Cancel</button>
                <button type="button" id="project-submit-btn">Add Project</button>
              </div>
            `;
    projectButton.replaceWith(projectForm);
    const cancelButton = document.querySelector("#project-cancel-btn");
    cancelButton.addEventListener("click", () =>
      projectForm.replaceWith(projectButton)
    );
    const newProjectName = document.querySelector("#project-name");
    const submitButton = projectForm.querySelector("#project-submit-btn");
    submitButton.addEventListener("click", () => {
      storedProjects.addProject(Project(newProjectName.value));
      projectForm.replaceWith(projectButton);
      renderNavbar(storedProjects.getProjects());
    });
  };
  return { displayForm };
};
