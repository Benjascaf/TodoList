export default () => {
  const editDialog = document.createElement("dialog");
  editDialog.innerHTML = `
    <form class="edit-task" method="">
      <div class="edit-left-container">
        <div class="task-name-container">
          <label for="task-name-edit">New name:</label>
          <input type="text" value="task Name" id="task-name-edit" />
        </div>
        <div class="task-description-container">
          <label for="task-description-edit">New description:</label>
          <input type="text" id="task-description-edit" value="description" />
        </div>
      </div>
      <div class="edit-right-container">
        <div class="task-date-container">
          <label for="task-date-edit">New date:</label>
          <input type="date" id="task-date-edit" value="2013-01-08" />
        </div>
        <div class="task-priority-container">
          <label for="task-priority"></label>
          <select name="priority" id="task-priority" required>
            <option value="1">Priority 1</option>
            <option value="2">Priority 2</option>
            <option value="3">Priority 3</option>
            <option value="4">Priority 4</option>
          </select>
        </div>
      </div>
      <div class="form-btns-container">
        <button id="dialog-submit-btn" type="button">Save</button>
        <button id="dialog-cancel-btn" type="button">Cancel</button>
      </div>
    </form>`;
  editDialog.id = "edit-task-dialog";
  document.querySelector("body").append(editDialog);
};
