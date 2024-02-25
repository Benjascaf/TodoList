export default () => {
  const displayForm = () => {
    const projectButton = document.querySelector(".project-btn");
    const projectForm = document.createElement("form");
    projectForm.innerHTML = `
              <label for="project-name">Project Name:</label>
              <input type="text" id="project-name" placeholder="My cool Project">
              <button type="button">Cancel</button>
              <button type="button" class="project-submit-btn">Add Project</button>
            `;
    projectButton.replaceWith(projectForm);
    const submitButton = document.querySelector(".project-submit-btn");
    submitButton.addEventListener("click", () =>
      projectForm.replaceWith(projectButton)
    );
  };
  return { displayForm };
};
