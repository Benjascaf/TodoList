import Project from "./project.js";
import storedProjects from "./storedProjects";
import renderNavbar from "./navbar.js";
import renderProjectSection from "./projectSection.js";
export default (mainContainer) => {
  const displayForm = (projectName) => {
    const sectionButton = document.querySelector(".section-btn");
    const sectionForm = document.createElement("form");
    sectionForm.innerHTML = `
              <label for="section-name">Section Name:</label>
              <input type="text" autocomplete="off" id="section-name" placeholder="My cool section">
              <button type="button" class="section-cancel-btn">Cancel</button>
              <button type="button" class="section-submit-btn">Add Section</button>
            `;
    sectionButton.replaceWith(sectionForm);
    const cancelButton = document.querySelector(".section-cancel-btn");
    cancelButton.addEventListener("click", () =>
      sectionForm.replaceWith(sectionButton)
    );
    const newSectionName = document.querySelector("#section-name");
    const submitButton = sectionForm.querySelector(".section-submit-btn");
    submitButton.addEventListener("click", () => {
      storedProjects.addSubsectionToProject(newSectionName.value, projectName);
      sectionForm.replaceWith(sectionButton);
      renderProjectSection(
        mainContainer,
        storedProjects.getProject(projectName)
      );
    });
  };
  return { displayForm };
};
