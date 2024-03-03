import { addTaskToProjectSection } from "./projectSection";
export default function getAddTaskForm(addTaskButton, section) {
  const addTaskForm = document.createElement("form");
  addTaskForm.classList.add("add-task-form");
  addTaskForm.autocomplete = "off";
  addTaskForm.innerHTML = `<div class="form-top">
    <div class="task-name-container">
      <label for="task-name">Task Name:</label>
      <input
        type="text"
        placeholder="Task Name"
        id="task-name"
        required
      />
    </div>
    <div class="task-description-container">
      <label for="task-description">Task description:</label>
      <input
        type="text"
        id="task-description"
        placeholder="Task description"
        required
      />
    </div>
    <div class="task-date-container">
      <label for="task-date">Due Date:</label>
      <input type="date" id="task-date" required />
    </div>
    <div class="task-priority-container">
      <select name="priority" id="task-priority" required>
        <option value="1">Priority 1</option>
        <option value="2">Priority 2</option>
        <option value="3">Priority 3</option>
        <option value="4">Priority 4</option>
      </select>
    </div>
  </div>
  <div class="form-bottom">
    
    <div class="buttons-container">
      <button type="button" class="cancel-btn">Cancel</button>
      <button type="button" class="submit-btn">Add task</button>
    </div>
  </div>`;

  addTaskForm
    .querySelector(".cancel-btn")
    .addEventListener("click", () => addTaskForm.replaceWith(addTaskButton));

  addTaskForm.querySelector(".submit-btn").addEventListener("click", () => {
    addTaskToProjectSection(addTaskForm, section);
  });
  return addTaskForm;
}
