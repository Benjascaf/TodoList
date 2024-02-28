/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/navbar.js":
/*!***********************!*\
  !*** ./src/navbar.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderNavbar)
/* harmony export */ });
/* harmony import */ var _projectForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectForm */ "./src/projectForm.js");
/* harmony import */ var _storedProjects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storedProjects */ "./src/storedProjects.js");
/* harmony import */ var _projectSection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projectSection */ "./src/projectSection.js");
/* harmony import */ var _todaySection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./todaySection */ "./src/todaySection.js");




function renderNavbar(projects) {
  const leftContainer = document.querySelector(".left-container");
  leftContainer.innerHTML = "";
  addTodaySection(leftContainer);
  addProjectsSection(leftContainer, projects);
}

function addTodaySection(parent) {
  const mainContainer = document.querySelector(".main-container");
  const todayHeader = createHeaderForSection("today", "Today");
  todayHeader.addEventListener("click", () =>
    (0,_todaySection__WEBPACK_IMPORTED_MODULE_3__["default"])(
      mainContainer,
      project.getSubsectionTasks("My subsection")
    )
  );
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
  const mainContainer = document.querySelector(".main-container");
  for (const project of projects) {
    const myProject = document.createElement("li");
    myProject.addEventListener("click", () => {
      (0,_projectSection__WEBPACK_IMPORTED_MODULE_2__["default"])(
        mainContainer,
        _storedProjects__WEBPACK_IMPORTED_MODULE_1__["default"].getProject(project.getProjectName())
      );
    });
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
    (0,_projectForm__WEBPACK_IMPORTED_MODULE_0__["default"])().displayForm()
  );
  parent.appendChild(projectButton);
}


/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Project)
/* harmony export */ });
/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo.js */ "./src/todo.js");


function Project(name) {
  const _name = name;
  const getProjectName = () => _name;
  const tasksContainers = {
    default: {},
  }; //An object literal to use as a dict and store tasks directly in
  //the project or in one of the subsections

  const addSubsection = (newSubjection) => {
    tasksContainers[newSubjection] = [];
  };

  //will have to remember the task's indexes using data attributes in the DOM
  const addTaskToSubsection = (subsection, ...newTaskInfo) => {
    const newTask = (0,_todo_js__WEBPACK_IMPORTED_MODULE_0__["default"])(...newTaskInfo);
    tasksContainers[subsection][newTask.getTitle()] = newTask;
  };

  const removeTaskFromSubsection = (subsection, taskName) => {
    if (taskName in tasksContainers) {
      delete tasksContainers[subsection][taskName];
    } else {
      alert("Attempted to remove task not found in corresponding section");
    }
  };

  const containsTask = (subsection, taskName) =>
    tasksContainers[subsection].find((task) => {
      task.getTitle === taskName;
    });

  const getSubsectionTasks = (subsection) =>
    Object.values(tasksContainers[subsection]);

  const getTodaySubsectionTasks = (subsection) => {
    const tasksInSectionDueToday = [];
    for (let task in tasksContainers[subsection]) {
      if (tasksContainers[subsection][task].isDueToday()) {
        tasksInSectionDueToday.concat(tasksContainers[subsection][task]);
      }
    }
  };

  const getTasksDueToday = () => {
    const tasksDueToday = [];
    for (let section in tasksContainers) {
      tasksDueToday.concat(getTodaySubsectionTasks(section));
    }
  };

  const getSubsections = () => Object.keys(tasksContainers);

  return {
    addSubsection,
    addTaskToSubsection,
    getSubsectionTasks,
    removeTaskFromSubsection,
    getTasksDueToday,
    getProjectName,
    getSubsections,
  };
}


/***/ }),

/***/ "./src/projectForm.js":
/*!****************************!*\
  !*** ./src/projectForm.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project.js */ "./src/project.js");
/* harmony import */ var _storedProjects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storedProjects */ "./src/storedProjects.js");
/* harmony import */ var _navbar_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./navbar.js */ "./src/navbar.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
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
      _storedProjects__WEBPACK_IMPORTED_MODULE_1__["default"].addProject((0,_project_js__WEBPACK_IMPORTED_MODULE_0__["default"])(newProjectName.value));
      projectForm.replaceWith(projectButton);
      (0,_navbar_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_storedProjects__WEBPACK_IMPORTED_MODULE_1__["default"].getProjects());
    });
  };
  return { displayForm };
});


/***/ }),

/***/ "./src/projectSection.js":
/*!*******************************!*\
  !*** ./src/projectSection.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addSection: () => (/* binding */ addSection),
/* harmony export */   appendTasks: () => (/* binding */ appendTasks),
/* harmony export */   "default": () => (/* binding */ renderProjectSection)
/* harmony export */ });
/* harmony import */ var _storedProjects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storedProjects */ "./src/storedProjects.js");


function renderProjectSection(mainContainer, project) {
  mainContainer.innerHTML = "";
  addProjectHeader(mainContainer, project.getProjectName());
  for (const subsection of project.getSubsections()) {
    addSection(
      subsection,
      mainContainer,
      project.getSubsectionTasks(subsection)
    );
  }
}

const addProjectHeader = (parent, projectName) => {
  const header = document.createElement("h1");
  header.classList.add("project-title");
  header.textContent = projectName;
  parent.append(header);
};
const addSection = (section, parent, tasks) => {
  console.log(tasks);
  const sectionContainer = document.createElement("div");
  sectionContainer.classList.add("section");
  addSectionHeader(section, sectionContainer);
  appendTasks(sectionContainer, tasks);
  appendAddButton(sectionContainer, section);
  parent.appendChild(sectionContainer);
};

const addSectionHeader = (section, parent) => {
  if (section !== "default") {
    const sectionHeader = document.createElement("h2");
    sectionHeader.classList.add("section-title");
    sectionHeader.textContent = section;
    parent.appendChild(sectionHeader);
  }
};

const appendTasks = (parent, tasks) => {
  const tasksContainer = document.createElement("ul");
  tasksContainer.classList.add("todo-container");
  for (const task of tasks) {
    appendTask(tasksContainer, task);
  }
  parent.appendChild(tasksContainer);
};

const appendTask = (parent, task) => {
  const taskContainer = document.createElement("li");
  taskContainer.classList.add("todo");

  const taskButton = document.createElement("button");
  taskButton.classList.add("todo-btn");
  taskButton.dataset.priority = task.getPriority();
  taskButton.addEventListener("click", () =>
    taskButton.classList.contains("checked")
      ? taskButton.classList.remove("checked")
      : taskButton.classList.add("checked")
  );

  const taskContentContainer = document.createElement("div");
  taskContentContainer.classList.add("todo-content");

  const taskHeader = document.createElement("h4");
  taskHeader.classList.add("todo-header");
  taskHeader.textContent = task.getTitle();

  const taskDate = document.createElement("p");
  taskDate.classList.add("todo-date");
  taskDate.textContent = task.getDueDate();

  const taskTrashContainer = document.createElement("div");
  taskTrashContainer.classList.add("trash-container");
  const taskTrash = document.createElement("i");
  taskTrash.classList.add("fa-solid", "fa-trash");
  taskTrashContainer.appendChild(taskTrash);

  const editContainer = document.createElement("div");
  editContainer.classList.add("edit-container");
  editContainer.addEventListener("click", () => displayEditTaskDialogue(task));
  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-regular", "fa-pen-to-square");
  editContainer.appendChild(editIcon);

  taskContentContainer.append(taskHeader, taskDate);

  taskContainer.append(
    taskButton,
    taskContentContainer,
    taskTrashContainer,
    editContainer
  );

  parent.append(taskContainer);
};

const appendAddButton = (parent, section) => {
  const buttonContainer = document.createElement("li");
  buttonContainer.classList.add("add-todo");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-plus");

  const text = document.createElement("p");
  text.textContent = "Add todo";

  const addTaskForm = getAddTaskForm(buttonContainer, section);

  buttonContainer.addEventListener("click", () =>
    buttonContainer.replaceWith(addTaskForm)
  );

  buttonContainer.append(icon, text);
  parent.append(buttonContainer);
};

const getAddTaskForm = (addTaskButton, section) => {
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
};

const displayEditTaskDialogue = (task) => {
  const dialog = document.querySelector("#edit-task-dialog");

  const taskName = dialog.querySelector("#task-name-edit");
  taskName.value = task.getTitle();

  const taskDescription = dialog.querySelector("#task-description-edit");
  taskDescription.value = task.getDescription();

  const taskDate = dialog.querySelector(`#task-date-edit`);
  taskDate.value = task.getDueDate();

  const taskPriority = dialog.querySelector(`#task-priority`);
  taskPriority.value = task.getPriority();

  const submitButton = dialog.querySelector("#dialog-submit-btn");
  const cancelButton = dialog.querySelector("#dialog-cancel-btn");

  cancelButton.addEventListener("click", () => dialog.close());

  dialog.showModal();
};

const addTaskToProjectSection = (taskForm, section) => {
  console.log(section);
  const taskTitle = taskForm.querySelector("#task-name").value;
  const taskDescription = taskForm.querySelector("#task-description").value;
  const taskDate = taskForm.querySelector("#task-date").value;
  const taskPriority = taskForm.querySelector("#task-priority").value;
  const currentProject = _storedProjects__WEBPACK_IMPORTED_MODULE_0__["default"].getProject(
    document.querySelector(".project-title").textContent
  );
  console.log(currentProject);
  currentProject.addTaskToSubsection(
    section,
    taskTitle,
    taskDescription,
    taskDate,
    taskPriority
  );
  const mainContainer = document.querySelector(".main-container");
  renderProjectSection(mainContainer, currentProject);
};


/***/ }),

/***/ "./src/storedProjects.js":
/*!*******************************!*\
  !*** ./src/storedProjects.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((() => {
  const _projects = {};
  const addProject = (project) => {
    const projectName = project.getProjectName();
    if (projectName in Object.keys(_projects)) {
      alert("Two different projects can't have the same name!");
    } else {
      _projects[projectName] = project;
    }
  };

  const removeProject = (project) => {
    delete _projects[project];
  };

  const getProjects = () => Object.values(_projects);

  const getProject = (project) => _projects[project];

  return {
    removeProject,
    getProjects,
    addProject,
    getProject,
  };
})());


/***/ }),

/***/ "./src/todaySection.js":
/*!*****************************!*\
  !*** ./src/todaySection.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderTodaySection)
/* harmony export */ });
/* harmony import */ var _projectSection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectSection */ "./src/projectSection.js");

function renderTodaySection(mainContainer, tasksDueToday) {
  mainContainer.innerHTML = "";
  const sectionHeader = document.createElement("h1");
  sectionHeader.classList.add("project-title");
  sectionHeader.textContent = "Today's todos";
  mainContainer.append(sectionHeader);
  (0,_projectSection__WEBPACK_IMPORTED_MODULE_0__.addSection)("default", mainContainer, tasksDueToday);
  document.querySelector(".add-todo").remove();
}


/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Todo)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/isToday.mjs");

function Todo(title, description, dueDate, priority) {
  const _title = title;
  const _description = description;
  const _dueDate = dueDate;
  const _priority = priority;
  const setTitle = (newTitle) => {
    _title = newTitle;
  };
  const setDescription = (newDescription) => {
    _description = newDescription;
  };

  const setDueDate = (newDate) => {
    _dueDate = newDate;
  };
  const setPriority = (newPriorityLevel) => {
    _priority = newPriorityLevel;
  };

  const getTitle = () => _title;
  const getDescription = () => _description;
  const getDueDate = () => _dueDate;
  const getPriority = () => _priority;
  const isDueToday = () => (0,date_fns__WEBPACK_IMPORTED_MODULE_0__.isToday)(_dueDate);
  return {
    setTitle,
    setDescription,
    setDueDate,
    setPriority,
    getTitle,
    getDescription,
    getPriority,
    getDueDate,
    isDueToday,
  };
}


/***/ }),

/***/ "./node_modules/date-fns/isSameDay.mjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/isSameDay.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isSameDay: () => (/* binding */ isSameDay)
/* harmony export */ });
/* harmony import */ var _startOfDay_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./startOfDay.mjs */ "./node_modules/date-fns/startOfDay.mjs");


/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day (and year and month)?
 *
 * @description
 * Are the given dates in the same day (and year and month)?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The first date to check
 * @param dateRight - The second date to check

 * @returns The dates are in the same day (and year and month)
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 *
 * @example
 * // Are 4 September and 4 October in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
 * //=> false
 *
 * @example
 * // Are 4 September, 2014 and 4 September, 2015 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
 * //=> false
 */
function isSameDay(dateLeft, dateRight) {
  const dateLeftStartOfDay = (0,_startOfDay_mjs__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(dateLeft);
  const dateRightStartOfDay = (0,_startOfDay_mjs__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(dateRight);

  return +dateLeftStartOfDay === +dateRightStartOfDay;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSameDay);


/***/ }),

/***/ "./node_modules/date-fns/isToday.mjs":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/isToday.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isToday: () => (/* binding */ isToday)
/* harmony export */ });
/* harmony import */ var _isSameDay_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isSameDay.mjs */ "./node_modules/date-fns/isSameDay.mjs");


/**
 * @name isToday
 * @category Day Helpers
 * @summary Is the given date today?
 * @pure false
 *
 * @description
 * Is the given date today?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to check
 *
 * @returns The date is today
 *
 * @example
 * // If today is 6 October 2014, is 6 October 14:00:00 today?
 * const result = isToday(new Date(2014, 9, 6, 14, 0))
 * //=> true
 */
function isToday(date) {
  return (0,_isSameDay_mjs__WEBPACK_IMPORTED_MODULE_0__.isSameDay)(date, Date.now());
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isToday);


/***/ }),

/***/ "./node_modules/date-fns/startOfDay.mjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/startOfDay.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   startOfDay: () => (/* binding */ startOfDay)
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");


/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(date) {
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startOfDay);


/***/ }),

/***/ "./node_modules/date-fns/toDate.mjs":
/*!******************************************!*\
  !*** ./node_modules/date-fns/toDate.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   toDate: () => (/* binding */ toDate)
/* harmony export */ });
/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  const argStr = Object.prototype.toString.call(argument);

  // Clone the date
  if (
    argument instanceof Date ||
    (typeof argument === "object" && argStr === "[object Date]")
  ) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new argument.constructor(+argument);
  } else if (
    typeof argument === "number" ||
    argStr === "[object Number]" ||
    typeof argument === "string" ||
    argStr === "[object String]"
  ) {
    // TODO: Can we get rid of as?
    return new Date(argument);
  } else {
    // TODO: Can we get rid of as?
    return new Date(NaN);
  }
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toDate);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _navbar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navbar.js */ "./src/navbar.js");
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project.js */ "./src/project.js");
/* harmony import */ var _projectSection_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projectSection.js */ "./src/projectSection.js");
/* harmony import */ var _todaySection_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./todaySection.js */ "./src/todaySection.js");
/* harmony import */ var _storedProjects_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./storedProjects.js */ "./src/storedProjects.js");
/* harmony import */ var _projectForm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./projectForm.js */ "./src/projectForm.js");






const project = (0,_project_js__WEBPACK_IMPORTED_MODULE_1__["default"])("My Project");
_storedProjects_js__WEBPACK_IMPORTED_MODULE_4__["default"].addProject(project);
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
_storedProjects_js__WEBPACK_IMPORTED_MODULE_4__["default"].addProject(project);
(0,_navbar_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_storedProjects_js__WEBPACK_IMPORTED_MODULE_4__["default"].getProjects());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBOEM7QUFDQTtBQUNNO0FBQ0o7QUFDakM7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx5REFBa0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sMkRBQW9CO0FBQzFCO0FBQ0EsUUFBUSx1REFBYztBQUN0QjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHdEQUFpQjtBQUNyQjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RStCO0FBQ0Y7QUFDZDtBQUNmO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0Isb0RBQUk7QUFDeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0RtQztBQUNXO0FBQ1A7QUFDdkMsaUVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSx1REFBYyxZQUFZLHVEQUFPO0FBQ3ZDO0FBQ0EsTUFBTSxzREFBWSxDQUFDLHVEQUFjO0FBQ2pDLEtBQUs7QUFDTDtBQUNBLFdBQVc7QUFDWCxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNCNEM7O0FBRS9CO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsdURBQWM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3JOQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEdBQUcsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCeUM7QUFDL0I7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSwyREFBVTtBQUNaO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUbUM7QUFDcEI7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsaURBQU87QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDOEM7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCw2QkFBNkIsMkRBQVU7QUFDdkMsOEJBQThCLDJEQUFVOztBQUV4QztBQUNBOztBQUVBO0FBQ0EsaUVBQWUsU0FBUyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3hDbUI7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLFNBQVMseURBQVM7QUFDbEI7O0FBRUE7QUFDQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0JlOztBQUV0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxnQkFBZ0IsbURBQU07QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUVBQWUsVUFBVSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0IxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7OztVQ3pEdEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnVDO0FBQ0o7QUFDb0I7QUFDSjtBQUNGO0FBQ0E7QUFDakQsZ0JBQWdCLHVEQUFPO0FBQ3ZCLDBEQUFjO0FBQ2Q7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUFjO0FBQ2Qsc0RBQVksQ0FBQywwREFBYyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL25hdmJhci5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3Byb2plY3RGb3JtLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3Byb2plY3RTZWN0aW9uLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3N0b3JlZFByb2plY3RzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3RvZGF5U2VjdGlvbi5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy90b2RvLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzU2FtZURheS5tanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNUb2RheS5tanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRPZkRheS5tanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvdG9EYXRlLm1qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZW5kZXJQcm9qZWN0Rm9ybSBmcm9tIFwiLi9wcm9qZWN0Rm9ybVwiO1xuaW1wb3J0IHN0b3JlZFByb2plY3RzIGZyb20gXCIuL3N0b3JlZFByb2plY3RzXCI7XG5pbXBvcnQgcmVuZGVyUHJvamVjdFNlY3Rpb24gZnJvbSBcIi4vcHJvamVjdFNlY3Rpb25cIjtcbmltcG9ydCByZW5kZXJUb2RheVNlY3Rpb24gZnJvbSBcIi4vdG9kYXlTZWN0aW9uXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJOYXZiYXIocHJvamVjdHMpIHtcbiAgY29uc3QgbGVmdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGVmdC1jb250YWluZXJcIik7XG4gIGxlZnRDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgYWRkVG9kYXlTZWN0aW9uKGxlZnRDb250YWluZXIpO1xuICBhZGRQcm9qZWN0c1NlY3Rpb24obGVmdENvbnRhaW5lciwgcHJvamVjdHMpO1xufVxuXG5mdW5jdGlvbiBhZGRUb2RheVNlY3Rpb24ocGFyZW50KSB7XG4gIGNvbnN0IG1haW5Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tY29udGFpbmVyXCIpO1xuICBjb25zdCB0b2RheUhlYWRlciA9IGNyZWF0ZUhlYWRlckZvclNlY3Rpb24oXCJ0b2RheVwiLCBcIlRvZGF5XCIpO1xuICB0b2RheUhlYWRlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT5cbiAgICByZW5kZXJUb2RheVNlY3Rpb24oXG4gICAgICBtYWluQ29udGFpbmVyLFxuICAgICAgcHJvamVjdC5nZXRTdWJzZWN0aW9uVGFza3MoXCJNeSBzdWJzZWN0aW9uXCIpXG4gICAgKVxuICApO1xuICBwYXJlbnQuYXBwZW5kKHRvZGF5SGVhZGVyKTtcbn1cblxuZnVuY3Rpb24gYWRkUHJvamVjdHNTZWN0aW9uKHBhcmVudCwgcHJvamVjdHMpIHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0cy1jb250YWluZXJcIik7XG4gIGNvbnN0IGhlYWRlckNvbnRhaW5lciA9IGNyZWF0ZUhlYWRlckZvclNlY3Rpb24oXCJwcm9qZWN0c1wiLCBcIk15IFByb2plY3RzXCIpO1xuICBjb25zdCBwcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gIHByb2plY3RzTGlzdC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdHMtbGlzdFwiKTtcbiAgYWRkUHJvamVjdHMocHJvamVjdHMsIHByb2plY3RzTGlzdCk7XG4gIGFwcGVuZFByb2plY3RCdXR0b24ocHJvamVjdHNMaXN0KTtcbiAgY29udGFpbmVyLmFwcGVuZChoZWFkZXJDb250YWluZXIsIHByb2plY3RzTGlzdCk7XG4gIHBhcmVudC5hcHBlbmQoY29udGFpbmVyKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSGVhZGVyRm9yU2VjdGlvbihzZWN0aW9uLCBoZWFkZXJUaXRsZSkge1xuICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gIGljb24uY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIsIFwiZmEtcm9ja2V0XCIpO1xuICBjb25zdCBoZWFkZXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBwcm9qZWN0c0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgaGVhZGVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoc2VjdGlvbiwgXCJoZWFkZXJcIik7XG4gIHByb2plY3RzSGVhZGVyLnRleHRDb250ZW50ID0gaGVhZGVyVGl0bGU7XG4gIGhlYWRlckNvbnRhaW5lci5hcHBlbmQoaWNvbiwgcHJvamVjdHNIZWFkZXIpO1xuICByZXR1cm4gaGVhZGVyQ29udGFpbmVyO1xufVxuXG5mdW5jdGlvbiBhZGRQcm9qZWN0cyhwcm9qZWN0cywgcGFyZW50KSB7XG4gIGNvbnN0IG1haW5Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tY29udGFpbmVyXCIpO1xuICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcbiAgICBjb25zdCBteVByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgbXlQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICByZW5kZXJQcm9qZWN0U2VjdGlvbihcbiAgICAgICAgbWFpbkNvbnRhaW5lcixcbiAgICAgICAgc3RvcmVkUHJvamVjdHMuZ2V0UHJvamVjdChwcm9qZWN0LmdldFByb2plY3ROYW1lKCkpXG4gICAgICApO1xuICAgIH0pO1xuICAgIG15UHJvamVjdC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKTtcbiAgICBteVByb2plY3QuZGF0YXNldC5wcm9qZWN0TmFtZSA9IHByb2plY3QuZ2V0UHJvamVjdE5hbWUoKTtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgaGVhZGVyLnRleHRDb250ZW50ID0gcHJvamVjdC5nZXRQcm9qZWN0TmFtZSgpO1xuICAgIG15UHJvamVjdC5hcHBlbmQoaGVhZGVyKTtcbiAgICBwYXJlbnQuYXBwZW5kKG15UHJvamVjdCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kUHJvamVjdEJ1dHRvbihwYXJlbnQpIHtcbiAgY29uc3QgcHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHByb2plY3RCdXR0b24uY2xhc3NMaXN0LmFkZChcInByb2plY3QtYnRuXCIpO1xuICBwcm9qZWN0QnV0dG9uLnRleHRDb250ZW50ID0gXCJOZXcgUHJvamVjdFwiO1xuICBwcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuICAgIHJlbmRlclByb2plY3RGb3JtKCkuZGlzcGxheUZvcm0oKVxuICApO1xuICBwYXJlbnQuYXBwZW5kQ2hpbGQocHJvamVjdEJ1dHRvbik7XG59XG4iLCJpbXBvcnQgeyBzdWIgfSBmcm9tIFwiZGF0ZS1mbnNcIjtcbmltcG9ydCBUb2RvIGZyb20gXCIuL3RvZG8uanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFByb2plY3QobmFtZSkge1xuICBjb25zdCBfbmFtZSA9IG5hbWU7XG4gIGNvbnN0IGdldFByb2plY3ROYW1lID0gKCkgPT4gX25hbWU7XG4gIGNvbnN0IHRhc2tzQ29udGFpbmVycyA9IHtcbiAgICBkZWZhdWx0OiB7fSxcbiAgfTsgLy9BbiBvYmplY3QgbGl0ZXJhbCB0byB1c2UgYXMgYSBkaWN0IGFuZCBzdG9yZSB0YXNrcyBkaXJlY3RseSBpblxuICAvL3RoZSBwcm9qZWN0IG9yIGluIG9uZSBvZiB0aGUgc3Vic2VjdGlvbnNcblxuICBjb25zdCBhZGRTdWJzZWN0aW9uID0gKG5ld1N1YmplY3Rpb24pID0+IHtcbiAgICB0YXNrc0NvbnRhaW5lcnNbbmV3U3ViamVjdGlvbl0gPSBbXTtcbiAgfTtcblxuICAvL3dpbGwgaGF2ZSB0byByZW1lbWJlciB0aGUgdGFzaydzIGluZGV4ZXMgdXNpbmcgZGF0YSBhdHRyaWJ1dGVzIGluIHRoZSBET01cbiAgY29uc3QgYWRkVGFza1RvU3Vic2VjdGlvbiA9IChzdWJzZWN0aW9uLCAuLi5uZXdUYXNrSW5mbykgPT4ge1xuICAgIGNvbnN0IG5ld1Rhc2sgPSBUb2RvKC4uLm5ld1Rhc2tJbmZvKTtcbiAgICB0YXNrc0NvbnRhaW5lcnNbc3Vic2VjdGlvbl1bbmV3VGFzay5nZXRUaXRsZSgpXSA9IG5ld1Rhc2s7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlVGFza0Zyb21TdWJzZWN0aW9uID0gKHN1YnNlY3Rpb24sIHRhc2tOYW1lKSA9PiB7XG4gICAgaWYgKHRhc2tOYW1lIGluIHRhc2tzQ29udGFpbmVycykge1xuICAgICAgZGVsZXRlIHRhc2tzQ29udGFpbmVyc1tzdWJzZWN0aW9uXVt0YXNrTmFtZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFwiQXR0ZW1wdGVkIHRvIHJlbW92ZSB0YXNrIG5vdCBmb3VuZCBpbiBjb3JyZXNwb25kaW5nIHNlY3Rpb25cIik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNvbnRhaW5zVGFzayA9IChzdWJzZWN0aW9uLCB0YXNrTmFtZSkgPT5cbiAgICB0YXNrc0NvbnRhaW5lcnNbc3Vic2VjdGlvbl0uZmluZCgodGFzaykgPT4ge1xuICAgICAgdGFzay5nZXRUaXRsZSA9PT0gdGFza05hbWU7XG4gICAgfSk7XG5cbiAgY29uc3QgZ2V0U3Vic2VjdGlvblRhc2tzID0gKHN1YnNlY3Rpb24pID0+XG4gICAgT2JqZWN0LnZhbHVlcyh0YXNrc0NvbnRhaW5lcnNbc3Vic2VjdGlvbl0pO1xuXG4gIGNvbnN0IGdldFRvZGF5U3Vic2VjdGlvblRhc2tzID0gKHN1YnNlY3Rpb24pID0+IHtcbiAgICBjb25zdCB0YXNrc0luU2VjdGlvbkR1ZVRvZGF5ID0gW107XG4gICAgZm9yIChsZXQgdGFzayBpbiB0YXNrc0NvbnRhaW5lcnNbc3Vic2VjdGlvbl0pIHtcbiAgICAgIGlmICh0YXNrc0NvbnRhaW5lcnNbc3Vic2VjdGlvbl1bdGFza10uaXNEdWVUb2RheSgpKSB7XG4gICAgICAgIHRhc2tzSW5TZWN0aW9uRHVlVG9kYXkuY29uY2F0KHRhc2tzQ29udGFpbmVyc1tzdWJzZWN0aW9uXVt0YXNrXSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldFRhc2tzRHVlVG9kYXkgPSAoKSA9PiB7XG4gICAgY29uc3QgdGFza3NEdWVUb2RheSA9IFtdO1xuICAgIGZvciAobGV0IHNlY3Rpb24gaW4gdGFza3NDb250YWluZXJzKSB7XG4gICAgICB0YXNrc0R1ZVRvZGF5LmNvbmNhdChnZXRUb2RheVN1YnNlY3Rpb25UYXNrcyhzZWN0aW9uKSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldFN1YnNlY3Rpb25zID0gKCkgPT4gT2JqZWN0LmtleXModGFza3NDb250YWluZXJzKTtcblxuICByZXR1cm4ge1xuICAgIGFkZFN1YnNlY3Rpb24sXG4gICAgYWRkVGFza1RvU3Vic2VjdGlvbixcbiAgICBnZXRTdWJzZWN0aW9uVGFza3MsXG4gICAgcmVtb3ZlVGFza0Zyb21TdWJzZWN0aW9uLFxuICAgIGdldFRhc2tzRHVlVG9kYXksXG4gICAgZ2V0UHJvamVjdE5hbWUsXG4gICAgZ2V0U3Vic2VjdGlvbnMsXG4gIH07XG59XG4iLCJpbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0LmpzXCI7XG5pbXBvcnQgc3RvcmVkUHJvamVjdHMgZnJvbSBcIi4vc3RvcmVkUHJvamVjdHNcIjtcbmltcG9ydCByZW5kZXJOYXZiYXIgZnJvbSBcIi4vbmF2YmFyLmpzXCI7XG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gIGNvbnN0IGRpc3BsYXlGb3JtID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtYnRuXCIpO1xuICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgcHJvamVjdEZvcm0uaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicHJvamVjdC1uYW1lXCI+UHJvamVjdCBOYW1lOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIGlkPVwicHJvamVjdC1uYW1lXCIgcGxhY2Vob2xkZXI9XCJNeSBjb29sIFByb2plY3RcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwcm9qZWN0LWNhbmNlbC1idG5cIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwcm9qZWN0LXN1Ym1pdC1idG5cIj5BZGQgUHJvamVjdDwvYnV0dG9uPlxuICAgICAgICAgICAgYDtcbiAgICBwcm9qZWN0QnV0dG9uLnJlcGxhY2VXaXRoKHByb2plY3RGb3JtKTtcbiAgICBjb25zdCBjYW5jZWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtY2FuY2VsLWJ0blwiKTtcbiAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG4gICAgICBwcm9qZWN0Rm9ybS5yZXBsYWNlV2l0aChwcm9qZWN0QnV0dG9uKVxuICAgICk7XG4gICAgY29uc3QgbmV3UHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtbmFtZVwiKTtcbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBwcm9qZWN0Rm9ybS5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3Qtc3VibWl0LWJ0blwiKTtcbiAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHN0b3JlZFByb2plY3RzLmFkZFByb2plY3QoUHJvamVjdChuZXdQcm9qZWN0TmFtZS52YWx1ZSkpO1xuICAgICAgcHJvamVjdEZvcm0ucmVwbGFjZVdpdGgocHJvamVjdEJ1dHRvbik7XG4gICAgICByZW5kZXJOYXZiYXIoc3RvcmVkUHJvamVjdHMuZ2V0UHJvamVjdHMoKSk7XG4gICAgfSk7XG4gIH07XG4gIHJldHVybiB7IGRpc3BsYXlGb3JtIH07XG59O1xuIiwiaW1wb3J0IHN0b3JlZFByb2plY3RzIGZyb20gXCIuL3N0b3JlZFByb2plY3RzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlclByb2plY3RTZWN0aW9uKG1haW5Db250YWluZXIsIHByb2plY3QpIHtcbiAgbWFpbkNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICBhZGRQcm9qZWN0SGVhZGVyKG1haW5Db250YWluZXIsIHByb2plY3QuZ2V0UHJvamVjdE5hbWUoKSk7XG4gIGZvciAoY29uc3Qgc3Vic2VjdGlvbiBvZiBwcm9qZWN0LmdldFN1YnNlY3Rpb25zKCkpIHtcbiAgICBhZGRTZWN0aW9uKFxuICAgICAgc3Vic2VjdGlvbixcbiAgICAgIG1haW5Db250YWluZXIsXG4gICAgICBwcm9qZWN0LmdldFN1YnNlY3Rpb25UYXNrcyhzdWJzZWN0aW9uKVxuICAgICk7XG4gIH1cbn1cbmV4cG9ydCB7IGFkZFNlY3Rpb24sIGFwcGVuZFRhc2tzIH07XG5jb25zdCBhZGRQcm9qZWN0SGVhZGVyID0gKHBhcmVudCwgcHJvamVjdE5hbWUpID0+IHtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcInByb2plY3QtdGl0bGVcIik7XG4gIGhlYWRlci50ZXh0Q29udGVudCA9IHByb2plY3ROYW1lO1xuICBwYXJlbnQuYXBwZW5kKGhlYWRlcik7XG59O1xuY29uc3QgYWRkU2VjdGlvbiA9IChzZWN0aW9uLCBwYXJlbnQsIHRhc2tzKSA9PiB7XG4gIGNvbnNvbGUubG9nKHRhc2tzKTtcbiAgY29uc3Qgc2VjdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNlY3Rpb25Db250YWluZXIuY2xhc3NMaXN0LmFkZChcInNlY3Rpb25cIik7XG4gIGFkZFNlY3Rpb25IZWFkZXIoc2VjdGlvbiwgc2VjdGlvbkNvbnRhaW5lcik7XG4gIGFwcGVuZFRhc2tzKHNlY3Rpb25Db250YWluZXIsIHRhc2tzKTtcbiAgYXBwZW5kQWRkQnV0dG9uKHNlY3Rpb25Db250YWluZXIsIHNlY3Rpb24pO1xuICBwYXJlbnQuYXBwZW5kQ2hpbGQoc2VjdGlvbkNvbnRhaW5lcik7XG59O1xuXG5jb25zdCBhZGRTZWN0aW9uSGVhZGVyID0gKHNlY3Rpb24sIHBhcmVudCkgPT4ge1xuICBpZiAoc2VjdGlvbiAhPT0gXCJkZWZhdWx0XCIpIHtcbiAgICBjb25zdCBzZWN0aW9uSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIHNlY3Rpb25IZWFkZXIuY2xhc3NMaXN0LmFkZChcInNlY3Rpb24tdGl0bGVcIik7XG4gICAgc2VjdGlvbkhlYWRlci50ZXh0Q29udGVudCA9IHNlY3Rpb247XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKHNlY3Rpb25IZWFkZXIpO1xuICB9XG59O1xuXG5jb25zdCBhcHBlbmRUYXNrcyA9IChwYXJlbnQsIHRhc2tzKSA9PiB7XG4gIGNvbnN0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICB0YXNrc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidG9kby1jb250YWluZXJcIik7XG4gIGZvciAoY29uc3QgdGFzayBvZiB0YXNrcykge1xuICAgIGFwcGVuZFRhc2sodGFza3NDb250YWluZXIsIHRhc2spO1xuICB9XG4gIHBhcmVudC5hcHBlbmRDaGlsZCh0YXNrc0NvbnRhaW5lcik7XG59O1xuXG5jb25zdCBhcHBlbmRUYXNrID0gKHBhcmVudCwgdGFzaykgPT4ge1xuICBjb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICB0YXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0b2RvXCIpO1xuXG4gIGNvbnN0IHRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICB0YXNrQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWJ0blwiKTtcbiAgdGFza0J1dHRvbi5kYXRhc2V0LnByaW9yaXR5ID0gdGFzay5nZXRQcmlvcml0eSgpO1xuICB0YXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuICAgIHRhc2tCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2hlY2tlZFwiKVxuICAgICAgPyB0YXNrQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJjaGVja2VkXCIpXG4gICAgICA6IHRhc2tCdXR0b24uY2xhc3NMaXN0LmFkZChcImNoZWNrZWRcIilcbiAgKTtcblxuICBjb25zdCB0YXNrQ29udGVudENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRhc2tDb250ZW50Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWNvbnRlbnRcIik7XG5cbiAgY29uc3QgdGFza0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKTtcbiAgdGFza0hlYWRlci5jbGFzc0xpc3QuYWRkKFwidG9kby1oZWFkZXJcIik7XG4gIHRhc2tIZWFkZXIudGV4dENvbnRlbnQgPSB0YXNrLmdldFRpdGxlKCk7XG5cbiAgY29uc3QgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgdGFza0RhdGUuY2xhc3NMaXN0LmFkZChcInRvZG8tZGF0ZVwiKTtcbiAgdGFza0RhdGUudGV4dENvbnRlbnQgPSB0YXNrLmdldER1ZURhdGUoKTtcblxuICBjb25zdCB0YXNrVHJhc2hDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0YXNrVHJhc2hDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRyYXNoLWNvbnRhaW5lclwiKTtcbiAgY29uc3QgdGFza1RyYXNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gIHRhc2tUcmFzaC5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS10cmFzaFwiKTtcbiAgdGFza1RyYXNoQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tUcmFzaCk7XG5cbiAgY29uc3QgZWRpdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGVkaXRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImVkaXQtY29udGFpbmVyXCIpO1xuICBlZGl0Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBkaXNwbGF5RWRpdFRhc2tEaWFsb2d1ZSh0YXNrKSk7XG4gIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1yZWd1bGFyXCIsIFwiZmEtcGVuLXRvLXNxdWFyZVwiKTtcbiAgZWRpdENvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0SWNvbik7XG5cbiAgdGFza0NvbnRlbnRDb250YWluZXIuYXBwZW5kKHRhc2tIZWFkZXIsIHRhc2tEYXRlKTtcblxuICB0YXNrQ29udGFpbmVyLmFwcGVuZChcbiAgICB0YXNrQnV0dG9uLFxuICAgIHRhc2tDb250ZW50Q29udGFpbmVyLFxuICAgIHRhc2tUcmFzaENvbnRhaW5lcixcbiAgICBlZGl0Q29udGFpbmVyXG4gICk7XG5cbiAgcGFyZW50LmFwcGVuZCh0YXNrQ29udGFpbmVyKTtcbn07XG5cbmNvbnN0IGFwcGVuZEFkZEJ1dHRvbiA9IChwYXJlbnQsIHNlY3Rpb24pID0+IHtcbiAgY29uc3QgYnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBidXR0b25Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImFkZC10b2RvXCIpO1xuXG4gIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgaWNvbi5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS1wbHVzXCIpO1xuXG4gIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgdGV4dC50ZXh0Q29udGVudCA9IFwiQWRkIHRvZG9cIjtcblxuICBjb25zdCBhZGRUYXNrRm9ybSA9IGdldEFkZFRhc2tGb3JtKGJ1dHRvbkNvbnRhaW5lciwgc2VjdGlvbik7XG5cbiAgYnV0dG9uQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuICAgIGJ1dHRvbkNvbnRhaW5lci5yZXBsYWNlV2l0aChhZGRUYXNrRm9ybSlcbiAgKTtcblxuICBidXR0b25Db250YWluZXIuYXBwZW5kKGljb24sIHRleHQpO1xuICBwYXJlbnQuYXBwZW5kKGJ1dHRvbkNvbnRhaW5lcik7XG59O1xuXG5jb25zdCBnZXRBZGRUYXNrRm9ybSA9IChhZGRUYXNrQnV0dG9uLCBzZWN0aW9uKSA9PiB7XG4gIGNvbnN0IGFkZFRhc2tGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gIGFkZFRhc2tGb3JtLmNsYXNzTGlzdC5hZGQoXCJhZGQtdGFzay1mb3JtXCIpO1xuICBhZGRUYXNrRm9ybS5hdXRvY29tcGxldGUgPSBcIm9mZlwiO1xuICBhZGRUYXNrRm9ybS5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImZvcm0tdG9wXCI+XG4gIDxkaXYgY2xhc3M9XCJ0YXNrLW5hbWUtY29udGFpbmVyXCI+XG4gICAgPGxhYmVsIGZvcj1cInRhc2stbmFtZVwiPlRhc2sgTmFtZTo8L2xhYmVsPlxuICAgIDxpbnB1dFxuICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgcGxhY2Vob2xkZXI9XCJUYXNrIE5hbWVcIlxuICAgICAgaWQ9XCJ0YXNrLW5hbWVcIlxuICAgICAgcmVxdWlyZWRcbiAgICAvPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInRhc2stZGVzY3JpcHRpb24tY29udGFpbmVyXCI+XG4gICAgPGxhYmVsIGZvcj1cInRhc2stZGVzY3JpcHRpb25cIj5UYXNrIGRlc2NyaXB0aW9uOjwvbGFiZWw+XG4gICAgPGlucHV0XG4gICAgICB0eXBlPVwidGV4dFwiXG4gICAgICBpZD1cInRhc2stZGVzY3JpcHRpb25cIlxuICAgICAgcGxhY2Vob2xkZXI9XCJUYXNrIGRlc2NyaXB0aW9uXCJcbiAgICAgIHJlcXVpcmVkXG4gICAgLz5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJ0YXNrLWRhdGUtY29udGFpbmVyXCI+XG4gICAgPGxhYmVsIGZvcj1cInRhc2stZGF0ZVwiPkR1ZSBEYXRlOjwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgaWQ9XCJ0YXNrLWRhdGVcIiByZXF1aXJlZCAvPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInRhc2stcHJpb3JpdHktY29udGFpbmVyXCI+XG4gICAgPHNlbGVjdCBuYW1lPVwicHJpb3JpdHlcIiBpZD1cInRhc2stcHJpb3JpdHlcIiByZXF1aXJlZD5cbiAgICAgIDxvcHRpb24gdmFsdWU9XCIxXCI+UHJpb3JpdHkgMTwvb3B0aW9uPlxuICAgICAgPG9wdGlvbiB2YWx1ZT1cIjJcIj5Qcmlvcml0eSAyPC9vcHRpb24+XG4gICAgICA8b3B0aW9uIHZhbHVlPVwiM1wiPlByaW9yaXR5IDM8L29wdGlvbj5cbiAgICAgIDxvcHRpb24gdmFsdWU9XCI0XCI+UHJpb3JpdHkgNDwvb3B0aW9uPlxuICAgIDwvc2VsZWN0PlxuICA8L2Rpdj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImZvcm0tYm90dG9tXCI+XG4gIFxuICA8ZGl2IGNsYXNzPVwiYnV0dG9ucy1jb250YWluZXJcIj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNhbmNlbC1idG5cIj5DYW5jZWw8L2J1dHRvbj5cbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInN1Ym1pdC1idG5cIj5BZGQgdGFzazwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZGl2PmA7XG5cbiAgYWRkVGFza0Zvcm1cbiAgICAucXVlcnlTZWxlY3RvcihcIi5jYW5jZWwtYnRuXCIpXG4gICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBhZGRUYXNrRm9ybS5yZXBsYWNlV2l0aChhZGRUYXNrQnV0dG9uKSk7XG5cbiAgYWRkVGFza0Zvcm0ucXVlcnlTZWxlY3RvcihcIi5zdWJtaXQtYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgYWRkVGFza1RvUHJvamVjdFNlY3Rpb24oYWRkVGFza0Zvcm0sIHNlY3Rpb24pO1xuICB9KTtcbiAgcmV0dXJuIGFkZFRhc2tGb3JtO1xufTtcblxuY29uc3QgZGlzcGxheUVkaXRUYXNrRGlhbG9ndWUgPSAodGFzaykgPT4ge1xuICBjb25zdCBkaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXQtdGFzay1kaWFsb2dcIik7XG5cbiAgY29uc3QgdGFza05hbWUgPSBkaWFsb2cucXVlcnlTZWxlY3RvcihcIiN0YXNrLW5hbWUtZWRpdFwiKTtcbiAgdGFza05hbWUudmFsdWUgPSB0YXNrLmdldFRpdGxlKCk7XG5cbiAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gZGlhbG9nLnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kZXNjcmlwdGlvbi1lZGl0XCIpO1xuICB0YXNrRGVzY3JpcHRpb24udmFsdWUgPSB0YXNrLmdldERlc2NyaXB0aW9uKCk7XG5cbiAgY29uc3QgdGFza0RhdGUgPSBkaWFsb2cucXVlcnlTZWxlY3RvcihgI3Rhc2stZGF0ZS1lZGl0YCk7XG4gIHRhc2tEYXRlLnZhbHVlID0gdGFzay5nZXREdWVEYXRlKCk7XG5cbiAgY29uc3QgdGFza1ByaW9yaXR5ID0gZGlhbG9nLnF1ZXJ5U2VsZWN0b3IoYCN0YXNrLXByaW9yaXR5YCk7XG4gIHRhc2tQcmlvcml0eS52YWx1ZSA9IHRhc2suZ2V0UHJpb3JpdHkoKTtcblxuICBjb25zdCBzdWJtaXRCdXR0b24gPSBkaWFsb2cucXVlcnlTZWxlY3RvcihcIiNkaWFsb2ctc3VibWl0LWJ0blwiKTtcbiAgY29uc3QgY2FuY2VsQnV0dG9uID0gZGlhbG9nLnF1ZXJ5U2VsZWN0b3IoXCIjZGlhbG9nLWNhbmNlbC1idG5cIik7XG5cbiAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBkaWFsb2cuY2xvc2UoKSk7XG5cbiAgZGlhbG9nLnNob3dNb2RhbCgpO1xufTtcblxuY29uc3QgYWRkVGFza1RvUHJvamVjdFNlY3Rpb24gPSAodGFza0Zvcm0sIHNlY3Rpb24pID0+IHtcbiAgY29uc29sZS5sb2coc2VjdGlvbik7XG4gIGNvbnN0IHRhc2tUaXRsZSA9IHRhc2tGb3JtLnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1uYW1lXCIpLnZhbHVlO1xuICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSB0YXNrRm9ybS5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZGVzY3JpcHRpb25cIikudmFsdWU7XG4gIGNvbnN0IHRhc2tEYXRlID0gdGFza0Zvcm0ucXVlcnlTZWxlY3RvcihcIiN0YXNrLWRhdGVcIikudmFsdWU7XG4gIGNvbnN0IHRhc2tQcmlvcml0eSA9IHRhc2tGb3JtLnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1wcmlvcml0eVwiKS52YWx1ZTtcbiAgY29uc3QgY3VycmVudFByb2plY3QgPSBzdG9yZWRQcm9qZWN0cy5nZXRQcm9qZWN0KFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC10aXRsZVwiKS50ZXh0Q29udGVudFxuICApO1xuICBjb25zb2xlLmxvZyhjdXJyZW50UHJvamVjdCk7XG4gIGN1cnJlbnRQcm9qZWN0LmFkZFRhc2tUb1N1YnNlY3Rpb24oXG4gICAgc2VjdGlvbixcbiAgICB0YXNrVGl0bGUsXG4gICAgdGFza0Rlc2NyaXB0aW9uLFxuICAgIHRhc2tEYXRlLFxuICAgIHRhc2tQcmlvcml0eVxuICApO1xuICBjb25zdCBtYWluQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWNvbnRhaW5lclwiKTtcbiAgcmVuZGVyUHJvamVjdFNlY3Rpb24obWFpbkNvbnRhaW5lciwgY3VycmVudFByb2plY3QpO1xufTtcbiIsImV4cG9ydCBkZWZhdWx0ICgoKSA9PiB7XG4gIGNvbnN0IF9wcm9qZWN0cyA9IHt9O1xuICBjb25zdCBhZGRQcm9qZWN0ID0gKHByb2plY3QpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHByb2plY3QuZ2V0UHJvamVjdE5hbWUoKTtcbiAgICBpZiAocHJvamVjdE5hbWUgaW4gT2JqZWN0LmtleXMoX3Byb2plY3RzKSkge1xuICAgICAgYWxlcnQoXCJUd28gZGlmZmVyZW50IHByb2plY3RzIGNhbid0IGhhdmUgdGhlIHNhbWUgbmFtZSFcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIF9wcm9qZWN0c1twcm9qZWN0TmFtZV0gPSBwcm9qZWN0O1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZW1vdmVQcm9qZWN0ID0gKHByb2plY3QpID0+IHtcbiAgICBkZWxldGUgX3Byb2plY3RzW3Byb2plY3RdO1xuICB9O1xuXG4gIGNvbnN0IGdldFByb2plY3RzID0gKCkgPT4gT2JqZWN0LnZhbHVlcyhfcHJvamVjdHMpO1xuXG4gIGNvbnN0IGdldFByb2plY3QgPSAocHJvamVjdCkgPT4gX3Byb2plY3RzW3Byb2plY3RdO1xuXG4gIHJldHVybiB7XG4gICAgcmVtb3ZlUHJvamVjdCxcbiAgICBnZXRQcm9qZWN0cyxcbiAgICBhZGRQcm9qZWN0LFxuICAgIGdldFByb2plY3QsXG4gIH07XG59KSgpO1xuIiwiaW1wb3J0IHsgYWRkU2VjdGlvbiB9IGZyb20gXCIuL3Byb2plY3RTZWN0aW9uXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJUb2RheVNlY3Rpb24obWFpbkNvbnRhaW5lciwgdGFza3NEdWVUb2RheSkge1xuICBtYWluQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gIGNvbnN0IHNlY3Rpb25IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gIHNlY3Rpb25IZWFkZXIuY2xhc3NMaXN0LmFkZChcInByb2plY3QtdGl0bGVcIik7XG4gIHNlY3Rpb25IZWFkZXIudGV4dENvbnRlbnQgPSBcIlRvZGF5J3MgdG9kb3NcIjtcbiAgbWFpbkNvbnRhaW5lci5hcHBlbmQoc2VjdGlvbkhlYWRlcik7XG4gIGFkZFNlY3Rpb24oXCJkZWZhdWx0XCIsIG1haW5Db250YWluZXIsIHRhc2tzRHVlVG9kYXkpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10b2RvXCIpLnJlbW92ZSgpO1xufVxuIiwiaW1wb3J0IHsgaXNUb2RheSB9IGZyb20gXCJkYXRlLWZuc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVG9kbyh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gIGNvbnN0IF90aXRsZSA9IHRpdGxlO1xuICBjb25zdCBfZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgY29uc3QgX2R1ZURhdGUgPSBkdWVEYXRlO1xuICBjb25zdCBfcHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgY29uc3Qgc2V0VGl0bGUgPSAobmV3VGl0bGUpID0+IHtcbiAgICBfdGl0bGUgPSBuZXdUaXRsZTtcbiAgfTtcbiAgY29uc3Qgc2V0RGVzY3JpcHRpb24gPSAobmV3RGVzY3JpcHRpb24pID0+IHtcbiAgICBfZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcbiAgfTtcblxuICBjb25zdCBzZXREdWVEYXRlID0gKG5ld0RhdGUpID0+IHtcbiAgICBfZHVlRGF0ZSA9IG5ld0RhdGU7XG4gIH07XG4gIGNvbnN0IHNldFByaW9yaXR5ID0gKG5ld1ByaW9yaXR5TGV2ZWwpID0+IHtcbiAgICBfcHJpb3JpdHkgPSBuZXdQcmlvcml0eUxldmVsO1xuICB9O1xuXG4gIGNvbnN0IGdldFRpdGxlID0gKCkgPT4gX3RpdGxlO1xuICBjb25zdCBnZXREZXNjcmlwdGlvbiA9ICgpID0+IF9kZXNjcmlwdGlvbjtcbiAgY29uc3QgZ2V0RHVlRGF0ZSA9ICgpID0+IF9kdWVEYXRlO1xuICBjb25zdCBnZXRQcmlvcml0eSA9ICgpID0+IF9wcmlvcml0eTtcbiAgY29uc3QgaXNEdWVUb2RheSA9ICgpID0+IGlzVG9kYXkoX2R1ZURhdGUpO1xuICByZXR1cm4ge1xuICAgIHNldFRpdGxlLFxuICAgIHNldERlc2NyaXB0aW9uLFxuICAgIHNldER1ZURhdGUsXG4gICAgc2V0UHJpb3JpdHksXG4gICAgZ2V0VGl0bGUsXG4gICAgZ2V0RGVzY3JpcHRpb24sXG4gICAgZ2V0UHJpb3JpdHksXG4gICAgZ2V0RHVlRGF0ZSxcbiAgICBpc0R1ZVRvZGF5LFxuICB9O1xufVxuIiwiaW1wb3J0IHsgc3RhcnRPZkRheSB9IGZyb20gXCIuL3N0YXJ0T2ZEYXkubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgaXNTYW1lRGF5XG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgZGF5IChhbmQgeWVhciBhbmQgbW9udGgpP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSBkYXkgKGFuZCB5ZWFyIGFuZCBtb250aCk/XG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGVMZWZ0IC0gVGhlIGZpcnN0IGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSBkYXRlUmlnaHQgLSBUaGUgc2Vjb25kIGRhdGUgdG8gY2hlY2tcblxuICogQHJldHVybnMgVGhlIGRhdGVzIGFyZSBpbiB0aGUgc2FtZSBkYXkgKGFuZCB5ZWFyIGFuZCBtb250aClcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDQgU2VwdGVtYmVyIDA2OjAwOjAwIGFuZCA0IFNlcHRlbWJlciAxODowMDowMCBpbiB0aGUgc2FtZSBkYXk/XG4gKiBjb25zdCByZXN1bHQgPSBpc1NhbWVEYXkobmV3IERhdGUoMjAxNCwgOCwgNCwgNiwgMCksIG5ldyBEYXRlKDIwMTQsIDgsIDQsIDE4LCAwKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBcmUgNCBTZXB0ZW1iZXIgYW5kIDQgT2N0b2JlciBpbiB0aGUgc2FtZSBkYXk/XG4gKiBjb25zdCByZXN1bHQgPSBpc1NhbWVEYXkobmV3IERhdGUoMjAxNCwgOCwgNCksIG5ldyBEYXRlKDIwMTQsIDksIDQpKVxuICogLy89PiBmYWxzZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBcmUgNCBTZXB0ZW1iZXIsIDIwMTQgYW5kIDQgU2VwdGVtYmVyLCAyMDE1IGluIHRoZSBzYW1lIGRheT9cbiAqIGNvbnN0IHJlc3VsdCA9IGlzU2FtZURheShuZXcgRGF0ZSgyMDE0LCA4LCA0KSwgbmV3IERhdGUoMjAxNSwgOCwgNCkpXG4gKiAvLz0+IGZhbHNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVEYXkoZGF0ZUxlZnQsIGRhdGVSaWdodCkge1xuICBjb25zdCBkYXRlTGVmdFN0YXJ0T2ZEYXkgPSBzdGFydE9mRGF5KGRhdGVMZWZ0KTtcbiAgY29uc3QgZGF0ZVJpZ2h0U3RhcnRPZkRheSA9IHN0YXJ0T2ZEYXkoZGF0ZVJpZ2h0KTtcblxuICByZXR1cm4gK2RhdGVMZWZ0U3RhcnRPZkRheSA9PT0gK2RhdGVSaWdodFN0YXJ0T2ZEYXk7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgaXNTYW1lRGF5O1xuIiwiaW1wb3J0IHsgaXNTYW1lRGF5IH0gZnJvbSBcIi4vaXNTYW1lRGF5Lm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIGlzVG9kYXlcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgdG9kYXk/XG4gKiBAcHVyZSBmYWxzZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgdG9kYXk/XG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgZGF0ZSB0byBjaGVja1xuICpcbiAqIEByZXR1cm5zIFRoZSBkYXRlIGlzIHRvZGF5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDYgT2N0b2JlciAyMDE0LCBpcyA2IE9jdG9iZXIgMTQ6MDA6MDAgdG9kYXk/XG4gKiBjb25zdCByZXN1bHQgPSBpc1RvZGF5KG5ldyBEYXRlKDIwMTQsIDksIDYsIDE0LCAwKSlcbiAqIC8vPT4gdHJ1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNUb2RheShkYXRlKSB7XG4gIHJldHVybiBpc1NhbWVEYXkoZGF0ZSwgRGF0ZS5ub3coKSk7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgaXNUb2RheTtcbiIsImltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBzdGFydE9mRGF5XG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYSBkYXkgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBzdGFydCBvZiBhIGRheSBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgc3RhcnQgb2YgYSBkYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGEgZGF5IGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBUdWUgU2VwIDAyIDIwMTQgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZEYXkoZGF0ZSkge1xuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgX2RhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBfZGF0ZTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBzdGFydE9mRGF5O1xuIiwiLyoqXG4gKiBAbmFtZSB0b0RhdGVcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGFuIGluc3RhbmNlIG9mIERhdGUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIGl0cyBjbG9uZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYSBudW1iZXIsIGl0IGlzIHRyZWF0ZWQgYXMgYSB0aW1lc3RhbXAuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIG5vbmUgb2YgdGhlIGFib3ZlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBJbnZhbGlkIERhdGUuXG4gKlxuICogKipOb3RlKio6ICphbGwqIERhdGUgYXJndW1lbnRzIHBhc3NlZCB0byBhbnkgKmRhdGUtZm5zKiBmdW5jdGlvbiBpcyBwcm9jZXNzZWQgYnkgYHRvRGF0ZWAuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGFyZ3VtZW50IC0gVGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqXG4gKiBAcmV0dXJucyBUaGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDbG9uZSB0aGUgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZShuZXcgRGF0ZSgyMDE0LCAxLCAxMSwgMTEsIDMwLCAzMCkpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHRoZSB0aW1lc3RhbXAgdG8gZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZSgxMzkyMDk4NDMwMDAwKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0ZShhcmd1bWVudCkge1xuICBjb25zdCBhcmdTdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnQpO1xuXG4gIC8vIENsb25lIHRoZSBkYXRlXG4gIGlmIChcbiAgICBhcmd1bWVudCBpbnN0YW5jZW9mIERhdGUgfHxcbiAgICAodHlwZW9mIGFyZ3VtZW50ID09PSBcIm9iamVjdFwiICYmIGFyZ1N0ciA9PT0gXCJbb2JqZWN0IERhdGVdXCIpXG4gICkge1xuICAgIC8vIFByZXZlbnQgdGhlIGRhdGUgdG8gbG9zZSB0aGUgbWlsbGlzZWNvbmRzIHdoZW4gcGFzc2VkIHRvIG5ldyBEYXRlKCkgaW4gSUUxMFxuICAgIHJldHVybiBuZXcgYXJndW1lbnQuY29uc3RydWN0b3IoK2FyZ3VtZW50KTtcbiAgfSBlbHNlIGlmIChcbiAgICB0eXBlb2YgYXJndW1lbnQgPT09IFwibnVtYmVyXCIgfHxcbiAgICBhcmdTdHIgPT09IFwiW29iamVjdCBOdW1iZXJdXCIgfHxcbiAgICB0eXBlb2YgYXJndW1lbnQgPT09IFwic3RyaW5nXCIgfHxcbiAgICBhcmdTdHIgPT09IFwiW29iamVjdCBTdHJpbmddXCJcbiAgKSB7XG4gICAgLy8gVE9ETzogQ2FuIHdlIGdldCByaWQgb2YgYXM/XG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBUT0RPOiBDYW4gd2UgZ2V0IHJpZCBvZiBhcz9cbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHRvRGF0ZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHJlbmRlck5hdmJhciBmcm9tIFwiLi9uYXZiYXIuanNcIjtcbmltcG9ydCBQcm9qZWN0IGZyb20gXCIuL3Byb2plY3QuanNcIjtcbmltcG9ydCByZW5kZXJQcm9qZWN0U2VjdGlvbiBmcm9tIFwiLi9wcm9qZWN0U2VjdGlvbi5qc1wiO1xuaW1wb3J0IHJlbmRlclRvZGF5U2VjdGlvbiBmcm9tIFwiLi90b2RheVNlY3Rpb24uanNcIjtcbmltcG9ydCBzdG9yZWRQcm9qZWN0cyBmcm9tIFwiLi9zdG9yZWRQcm9qZWN0cy5qc1wiO1xuaW1wb3J0IHJlbmRlclByb2plY3RGb3JtIGZyb20gXCIuL3Byb2plY3RGb3JtLmpzXCI7XG5jb25zdCBwcm9qZWN0ID0gUHJvamVjdChcIk15IFByb2plY3RcIik7XG5zdG9yZWRQcm9qZWN0cy5hZGRQcm9qZWN0KHByb2plY3QpO1xucHJvamVjdC5hZGRTdWJzZWN0aW9uKFwiTXkgc3Vic2VjdGlvblwiKTtcbmZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gIHByb2plY3QuYWRkVGFza1RvU3Vic2VjdGlvbihcbiAgICBcImRlZmF1bHRcIixcbiAgICBcIkNsZWFuIFRoZSBob3VzZVwiLFxuICAgIFwib1wiLFxuICAgIFwiQXVndXN0IDI0XCIsXG4gICAgXCIzXCJcbiAgKTtcbn1cbmZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gIHByb2plY3QuYWRkVGFza1RvU3Vic2VjdGlvbihcbiAgICBcIk15IHN1YnNlY3Rpb25cIixcbiAgICBcIkNsZWFuIFRoZSBob3VzZVwiLFxuICAgIFwib1wiLFxuICAgIFwiQXVndXN0IDI0XCIsXG4gICAgXCIzXCJcbiAgKTtcbn1cbnN0b3JlZFByb2plY3RzLmFkZFByb2plY3QocHJvamVjdCk7XG5yZW5kZXJOYXZiYXIoc3RvcmVkUHJvamVjdHMuZ2V0UHJvamVjdHMoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=