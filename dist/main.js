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
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projectForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectForm */ "./src/projectForm.js");

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(projects) {
  const leftContainer = document.querySelector(".left-container");
  addTodaySection(leftContainer);
  addProjectsSection(leftContainer, projects);
}

function addTodaySection(parent) {
  const todayHeader = createHeaderForSection("today", "Today");
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
  for (const project of projects) {
    const myProject = document.createElement("li");
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
    default: [],
  }; //An object literal to use as a dict and store tasks directly in
  //the project or in one of the subsections

  const addSubsection = (newSubjection) => {
    tasksContainers[newSubjection] = [];
  };

  //will have to remember the task's indexes using data attributes in the DOM
  const addTaskToSubsection = (subsection, ...newTaskInfo) =>
    tasksContainers[subsection].push((0,_todo_js__WEBPACK_IMPORTED_MODULE_0__["default"])(...newTaskInfo));

  const removeTaskFromSubsection = (subsection, taskToRemoveIndex) => {
    if (containsTask(subsection, taskName)) {
      delete tasksContainers[subsection][taskToRemoveIndex];
    } else {
      alert("Attempted to remove task not found in corresponding section");
    }
  };

  const containsTask = (subsection, taskName) =>
    tasksContainers[subsection].find((task) => {
      task.getTitle === taskName;
    });

  const getSubsectionTasks = (subsection) => tasksContainers[subsection];

  const getTodaySubsectionTasks = (subsection) =>
    tasksContainers[subsection].filter((task) => task.isDueToday());

  const getTasksDueToday = () => {
    const tasksDueToday = [];
    for (let key in tasksContainers) {
      tasksDueToday.concat(getTodaySubsectionTasks(key));
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
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
  const sectionContainer = document.createElement("div");
  sectionContainer.classList.add("section");
  addSectionHeader(section, sectionContainer);
  appendTasks(sectionContainer, tasks);
  appendAddButton(sectionContainer);
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

  const taskContentContainer = document.createElement("div");
  taskContentContainer.classList.add("todo-content");

  const taskHeader = document.createElement("h4");
  taskHeader.classList.add("todo-header");
  taskHeader.textContent = task.getTitle();

  const taskDate = document.createElement("p");
  taskDate.classList.add("todo-date");
  taskDate.textContent = task.getDueDate();

  taskContentContainer.append(taskHeader, taskDate);

  taskContainer.append(taskButton, taskContentContainer);

  parent.append(taskContainer);
};

const appendAddButton = (parent) => {
  const buttonContainer = document.createElement("li");
  buttonContainer.classList.add("add-todo");

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-plus");

  const text = document.createElement("p");
  text.textContent = "Add todo";

  buttonContainer.append(icon, text);
  parent.append(buttonContainer);
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
    console.log("adding");
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

const mainContainer = document.querySelector(".main-container");
(0,_navbar_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_storedProjects_js__WEBPACK_IMPORTED_MODULE_4__["default"].getProjects());
const todayTitle = document.querySelector(".today");
const projectHeaders = document.querySelectorAll(".project");
todayTitle.addEventListener("click", () =>
  (0,_todaySection_js__WEBPACK_IMPORTED_MODULE_3__["default"])(mainContainer, project.getSubsectionTasks("My subsection"))
);

projectHeaders.forEach((projectHeader) => {
  projectHeader.addEventListener("click", () => {
    (0,_projectSection_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
      mainContainer,
      _storedProjects_js__WEBPACK_IMPORTED_MODULE_4__["default"].getProject(projectHeader.dataset.projectName)
    );
  });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOaUM7QUFDRTtBQUNvQjtBQUNKO0FBQ0Y7QUFDQTtBQUNqRCxnQkFBZ0IsdURBQU87QUFDdkIsMERBQWM7QUFDZDtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQWM7O0FBRWQ7QUFDQSxzREFBTSxDQUFDLDBEQUFjO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLEVBQUUsNERBQWtCO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQSxJQUFJLDhEQUFvQjtBQUN4QjtBQUNBLE1BQU0sMERBQWM7QUFDcEI7QUFDQSxHQUFHO0FBQ0gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL25hdmJhci5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3Byb2plY3RGb3JtLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3Byb2plY3RTZWN0aW9uLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3N0b3JlZFByb2plY3RzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3RvZGF5U2VjdGlvbi5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy90b2RvLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzU2FtZURheS5tanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNUb2RheS5tanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRPZkRheS5tanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvdG9EYXRlLm1qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZW5kZXJQcm9qZWN0Rm9ybSBmcm9tIFwiLi9wcm9qZWN0Rm9ybVwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb2plY3RzKSB7XG4gIGNvbnN0IGxlZnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxlZnQtY29udGFpbmVyXCIpO1xuICBhZGRUb2RheVNlY3Rpb24obGVmdENvbnRhaW5lcik7XG4gIGFkZFByb2plY3RzU2VjdGlvbihsZWZ0Q29udGFpbmVyLCBwcm9qZWN0cyk7XG59XG5cbmZ1bmN0aW9uIGFkZFRvZGF5U2VjdGlvbihwYXJlbnQpIHtcbiAgY29uc3QgdG9kYXlIZWFkZXIgPSBjcmVhdGVIZWFkZXJGb3JTZWN0aW9uKFwidG9kYXlcIiwgXCJUb2RheVwiKTtcbiAgcGFyZW50LmFwcGVuZCh0b2RheUhlYWRlcik7XG59XG5cbmZ1bmN0aW9uIGFkZFByb2plY3RzU2VjdGlvbihwYXJlbnQsIHByb2plY3RzKSB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicHJvamVjdHMtY29udGFpbmVyXCIpO1xuICBjb25zdCBoZWFkZXJDb250YWluZXIgPSBjcmVhdGVIZWFkZXJGb3JTZWN0aW9uKFwicHJvamVjdHNcIiwgXCJNeSBQcm9qZWN0c1wiKTtcbiAgY29uc3QgcHJvamVjdHNMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICBwcm9qZWN0c0xpc3QuY2xhc3NMaXN0LmFkZChcInByb2plY3RzLWxpc3RcIik7XG4gIGFkZFByb2plY3RzKHByb2plY3RzLCBwcm9qZWN0c0xpc3QpO1xuICBhcHBlbmRQcm9qZWN0QnV0dG9uKHByb2plY3RzTGlzdCk7XG4gIGNvbnRhaW5lci5hcHBlbmQoaGVhZGVyQ29udGFpbmVyLCBwcm9qZWN0c0xpc3QpO1xuICBwYXJlbnQuYXBwZW5kKGNvbnRhaW5lcik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhlYWRlckZvclNlY3Rpb24oc2VjdGlvbiwgaGVhZGVyVGl0bGUpIHtcbiAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuICBpY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLXJvY2tldFwiKTtcbiAgY29uc3QgaGVhZGVyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgcHJvamVjdHNIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gIGhlYWRlckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHNlY3Rpb24sIFwiaGVhZGVyXCIpO1xuICBwcm9qZWN0c0hlYWRlci50ZXh0Q29udGVudCA9IGhlYWRlclRpdGxlO1xuICBoZWFkZXJDb250YWluZXIuYXBwZW5kKGljb24sIHByb2plY3RzSGVhZGVyKTtcbiAgcmV0dXJuIGhlYWRlckNvbnRhaW5lcjtcbn1cblxuZnVuY3Rpb24gYWRkUHJvamVjdHMocHJvamVjdHMsIHBhcmVudCkge1xuICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcbiAgICBjb25zdCBteVByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgbXlQcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xuICAgIG15UHJvamVjdC5kYXRhc2V0LnByb2plY3ROYW1lID0gcHJvamVjdC5nZXRQcm9qZWN0TmFtZSgpO1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBwcm9qZWN0LmdldFByb2plY3ROYW1lKCk7XG4gICAgbXlQcm9qZWN0LmFwcGVuZChoZWFkZXIpO1xuICAgIHBhcmVudC5hcHBlbmQobXlQcm9qZWN0KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBlbmRQcm9qZWN0QnV0dG9uKHBhcmVudCkge1xuICBjb25zdCBwcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgcHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1idG5cIik7XG4gIHByb2plY3RCdXR0b24udGV4dENvbnRlbnQgPSBcIk5ldyBQcm9qZWN0XCI7XG4gIHByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XG4gICAgcmVuZGVyUHJvamVjdEZvcm0oKS5kaXNwbGF5Rm9ybSgpXG4gICk7XG4gIHBhcmVudC5hcHBlbmRDaGlsZChwcm9qZWN0QnV0dG9uKTtcbn1cbiIsImltcG9ydCBUb2RvIGZyb20gXCIuL3RvZG8uanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFByb2plY3QobmFtZSkge1xuICBjb25zdCBfbmFtZSA9IG5hbWU7XG4gIGNvbnN0IGdldFByb2plY3ROYW1lID0gKCkgPT4gX25hbWU7XG4gIGNvbnN0IHRhc2tzQ29udGFpbmVycyA9IHtcbiAgICBkZWZhdWx0OiBbXSxcbiAgfTsgLy9BbiBvYmplY3QgbGl0ZXJhbCB0byB1c2UgYXMgYSBkaWN0IGFuZCBzdG9yZSB0YXNrcyBkaXJlY3RseSBpblxuICAvL3RoZSBwcm9qZWN0IG9yIGluIG9uZSBvZiB0aGUgc3Vic2VjdGlvbnNcblxuICBjb25zdCBhZGRTdWJzZWN0aW9uID0gKG5ld1N1YmplY3Rpb24pID0+IHtcbiAgICB0YXNrc0NvbnRhaW5lcnNbbmV3U3ViamVjdGlvbl0gPSBbXTtcbiAgfTtcblxuICAvL3dpbGwgaGF2ZSB0byByZW1lbWJlciB0aGUgdGFzaydzIGluZGV4ZXMgdXNpbmcgZGF0YSBhdHRyaWJ1dGVzIGluIHRoZSBET01cbiAgY29uc3QgYWRkVGFza1RvU3Vic2VjdGlvbiA9IChzdWJzZWN0aW9uLCAuLi5uZXdUYXNrSW5mbykgPT5cbiAgICB0YXNrc0NvbnRhaW5lcnNbc3Vic2VjdGlvbl0ucHVzaChUb2RvKC4uLm5ld1Rhc2tJbmZvKSk7XG5cbiAgY29uc3QgcmVtb3ZlVGFza0Zyb21TdWJzZWN0aW9uID0gKHN1YnNlY3Rpb24sIHRhc2tUb1JlbW92ZUluZGV4KSA9PiB7XG4gICAgaWYgKGNvbnRhaW5zVGFzayhzdWJzZWN0aW9uLCB0YXNrTmFtZSkpIHtcbiAgICAgIGRlbGV0ZSB0YXNrc0NvbnRhaW5lcnNbc3Vic2VjdGlvbl1bdGFza1RvUmVtb3ZlSW5kZXhdO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChcIkF0dGVtcHRlZCB0byByZW1vdmUgdGFzayBub3QgZm91bmQgaW4gY29ycmVzcG9uZGluZyBzZWN0aW9uXCIpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjb250YWluc1Rhc2sgPSAoc3Vic2VjdGlvbiwgdGFza05hbWUpID0+XG4gICAgdGFza3NDb250YWluZXJzW3N1YnNlY3Rpb25dLmZpbmQoKHRhc2spID0+IHtcbiAgICAgIHRhc2suZ2V0VGl0bGUgPT09IHRhc2tOYW1lO1xuICAgIH0pO1xuXG4gIGNvbnN0IGdldFN1YnNlY3Rpb25UYXNrcyA9IChzdWJzZWN0aW9uKSA9PiB0YXNrc0NvbnRhaW5lcnNbc3Vic2VjdGlvbl07XG5cbiAgY29uc3QgZ2V0VG9kYXlTdWJzZWN0aW9uVGFza3MgPSAoc3Vic2VjdGlvbikgPT5cbiAgICB0YXNrc0NvbnRhaW5lcnNbc3Vic2VjdGlvbl0uZmlsdGVyKCh0YXNrKSA9PiB0YXNrLmlzRHVlVG9kYXkoKSk7XG5cbiAgY29uc3QgZ2V0VGFza3NEdWVUb2RheSA9ICgpID0+IHtcbiAgICBjb25zdCB0YXNrc0R1ZVRvZGF5ID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIHRhc2tzQ29udGFpbmVycykge1xuICAgICAgdGFza3NEdWVUb2RheS5jb25jYXQoZ2V0VG9kYXlTdWJzZWN0aW9uVGFza3Moa2V5KSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldFN1YnNlY3Rpb25zID0gKCkgPT4gT2JqZWN0LmtleXModGFza3NDb250YWluZXJzKTtcblxuICByZXR1cm4ge1xuICAgIGFkZFN1YnNlY3Rpb24sXG4gICAgYWRkVGFza1RvU3Vic2VjdGlvbixcbiAgICBnZXRTdWJzZWN0aW9uVGFza3MsXG4gICAgcmVtb3ZlVGFza0Zyb21TdWJzZWN0aW9uLFxuICAgIGdldFRhc2tzRHVlVG9kYXksXG4gICAgZ2V0UHJvamVjdE5hbWUsXG4gICAgZ2V0U3Vic2VjdGlvbnMsXG4gIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gIGNvbnN0IGRpc3BsYXlGb3JtID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtYnRuXCIpO1xuICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgcHJvamVjdEZvcm0uaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicHJvamVjdC1uYW1lXCI+UHJvamVjdCBOYW1lOjwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwicHJvamVjdC1uYW1lXCIgcGxhY2Vob2xkZXI9XCJNeSBjb29sIFByb2plY3RcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicHJvamVjdC1zdWJtaXQtYnRuXCI+QWRkIFByb2plY3Q8L2J1dHRvbj5cbiAgICAgICAgICAgIGA7XG4gICAgcHJvamVjdEJ1dHRvbi5yZXBsYWNlV2l0aChwcm9qZWN0Rm9ybSk7XG4gICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LXN1Ym1pdC1idG5cIik7XG4gICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuICAgICAgcHJvamVjdEZvcm0ucmVwbGFjZVdpdGgocHJvamVjdEJ1dHRvbilcbiAgICApO1xuICB9O1xuICByZXR1cm4geyBkaXNwbGF5Rm9ybSB9O1xufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlclByb2plY3RTZWN0aW9uKG1haW5Db250YWluZXIsIHByb2plY3QpIHtcbiAgbWFpbkNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICBhZGRQcm9qZWN0SGVhZGVyKG1haW5Db250YWluZXIsIHByb2plY3QuZ2V0UHJvamVjdE5hbWUoKSk7XG4gIGZvciAoY29uc3Qgc3Vic2VjdGlvbiBvZiBwcm9qZWN0LmdldFN1YnNlY3Rpb25zKCkpIHtcbiAgICBhZGRTZWN0aW9uKFxuICAgICAgc3Vic2VjdGlvbixcbiAgICAgIG1haW5Db250YWluZXIsXG4gICAgICBwcm9qZWN0LmdldFN1YnNlY3Rpb25UYXNrcyhzdWJzZWN0aW9uKVxuICAgICk7XG4gIH1cbn1cbmV4cG9ydCB7IGFkZFNlY3Rpb24sIGFwcGVuZFRhc2tzIH07XG5jb25zdCBhZGRQcm9qZWN0SGVhZGVyID0gKHBhcmVudCwgcHJvamVjdE5hbWUpID0+IHtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcInByb2plY3QtdGl0bGVcIik7XG4gIGhlYWRlci50ZXh0Q29udGVudCA9IHByb2plY3ROYW1lO1xuICBwYXJlbnQuYXBwZW5kKGhlYWRlcik7XG59O1xuY29uc3QgYWRkU2VjdGlvbiA9IChzZWN0aW9uLCBwYXJlbnQsIHRhc2tzKSA9PiB7XG4gIGNvbnN0IHNlY3Rpb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzZWN0aW9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJzZWN0aW9uXCIpO1xuICBhZGRTZWN0aW9uSGVhZGVyKHNlY3Rpb24sIHNlY3Rpb25Db250YWluZXIpO1xuICBhcHBlbmRUYXNrcyhzZWN0aW9uQ29udGFpbmVyLCB0YXNrcyk7XG4gIGFwcGVuZEFkZEJ1dHRvbihzZWN0aW9uQ29udGFpbmVyKTtcbiAgcGFyZW50LmFwcGVuZENoaWxkKHNlY3Rpb25Db250YWluZXIpO1xufTtcblxuY29uc3QgYWRkU2VjdGlvbkhlYWRlciA9IChzZWN0aW9uLCBwYXJlbnQpID0+IHtcbiAgaWYgKHNlY3Rpb24gIT09IFwiZGVmYXVsdFwiKSB7XG4gICAgY29uc3Qgc2VjdGlvbkhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBzZWN0aW9uSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJzZWN0aW9uLXRpdGxlXCIpO1xuICAgIHNlY3Rpb25IZWFkZXIudGV4dENvbnRlbnQgPSBzZWN0aW9uO1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZChzZWN0aW9uSGVhZGVyKTtcbiAgfVxufTtcblxuY29uc3QgYXBwZW5kVGFza3MgPSAocGFyZW50LCB0YXNrcykgPT4ge1xuICBjb25zdCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgdGFza3NDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRvZG8tY29udGFpbmVyXCIpO1xuICBmb3IgKGNvbnN0IHRhc2sgb2YgdGFza3MpIHtcbiAgICBhcHBlbmRUYXNrKHRhc2tzQ29udGFpbmVyLCB0YXNrKTtcbiAgfVxuICBwYXJlbnQuYXBwZW5kQ2hpbGQodGFza3NDb250YWluZXIpO1xufTtcblxuY29uc3QgYXBwZW5kVGFzayA9IChwYXJlbnQsIHRhc2spID0+IHtcbiAgY29uc3QgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgdGFza0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidG9kb1wiKTtcblxuICBjb25zdCB0YXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgdGFza0J1dHRvbi5jbGFzc0xpc3QuYWRkKFwidG9kby1idG5cIik7XG4gIHRhc2tCdXR0b24uZGF0YXNldC5wcmlvcml0eSA9IHRhc2suZ2V0UHJpb3JpdHkoKTtcblxuICBjb25zdCB0YXNrQ29udGVudENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRhc2tDb250ZW50Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWNvbnRlbnRcIik7XG5cbiAgY29uc3QgdGFza0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKTtcbiAgdGFza0hlYWRlci5jbGFzc0xpc3QuYWRkKFwidG9kby1oZWFkZXJcIik7XG4gIHRhc2tIZWFkZXIudGV4dENvbnRlbnQgPSB0YXNrLmdldFRpdGxlKCk7XG5cbiAgY29uc3QgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgdGFza0RhdGUuY2xhc3NMaXN0LmFkZChcInRvZG8tZGF0ZVwiKTtcbiAgdGFza0RhdGUudGV4dENvbnRlbnQgPSB0YXNrLmdldER1ZURhdGUoKTtcblxuICB0YXNrQ29udGVudENvbnRhaW5lci5hcHBlbmQodGFza0hlYWRlciwgdGFza0RhdGUpO1xuXG4gIHRhc2tDb250YWluZXIuYXBwZW5kKHRhc2tCdXR0b24sIHRhc2tDb250ZW50Q29udGFpbmVyKTtcblxuICBwYXJlbnQuYXBwZW5kKHRhc2tDb250YWluZXIpO1xufTtcblxuY29uc3QgYXBwZW5kQWRkQnV0dG9uID0gKHBhcmVudCkgPT4ge1xuICBjb25zdCBidXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gIGJ1dHRvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWRkLXRvZG9cIik7XG5cbiAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuICBpY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLXBsdXNcIik7XG5cbiAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICB0ZXh0LnRleHRDb250ZW50ID0gXCJBZGQgdG9kb1wiO1xuXG4gIGJ1dHRvbkNvbnRhaW5lci5hcHBlbmQoaWNvbiwgdGV4dCk7XG4gIHBhcmVudC5hcHBlbmQoYnV0dG9uQ29udGFpbmVyKTtcbn07XG4iLCJleHBvcnQgZGVmYXVsdCAoKCkgPT4ge1xuICBjb25zdCBfcHJvamVjdHMgPSB7fTtcbiAgY29uc3QgYWRkUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJhZGRpbmdcIik7XG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSBwcm9qZWN0LmdldFByb2plY3ROYW1lKCk7XG4gICAgaWYgKHByb2plY3ROYW1lIGluIE9iamVjdC5rZXlzKF9wcm9qZWN0cykpIHtcbiAgICAgIGFsZXJ0KFwiVHdvIGRpZmZlcmVudCBwcm9qZWN0cyBjYW4ndCBoYXZlIHRoZSBzYW1lIG5hbWUhXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfcHJvamVjdHNbcHJvamVjdE5hbWVdID0gcHJvamVjdDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgZGVsZXRlIF9wcm9qZWN0c1twcm9qZWN0XTtcbiAgfTtcblxuICBjb25zdCBnZXRQcm9qZWN0cyA9ICgpID0+IE9iamVjdC52YWx1ZXMoX3Byb2plY3RzKTtcblxuICBjb25zdCBnZXRQcm9qZWN0ID0gKHByb2plY3QpID0+IF9wcm9qZWN0c1twcm9qZWN0XTtcblxuICByZXR1cm4ge1xuICAgIHJlbW92ZVByb2plY3QsXG4gICAgZ2V0UHJvamVjdHMsXG4gICAgYWRkUHJvamVjdCxcbiAgICBnZXRQcm9qZWN0LFxuICB9O1xufSkoKTtcbiIsImltcG9ydCB7IGFkZFNlY3Rpb24gfSBmcm9tIFwiLi9wcm9qZWN0U2VjdGlvblwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyVG9kYXlTZWN0aW9uKG1haW5Db250YWluZXIsIHRhc2tzRHVlVG9kYXkpIHtcbiAgbWFpbkNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICBjb25zdCBzZWN0aW9uSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICBzZWN0aW9uSGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LXRpdGxlXCIpO1xuICBzZWN0aW9uSGVhZGVyLnRleHRDb250ZW50ID0gXCJUb2RheSdzIHRvZG9zXCI7XG4gIG1haW5Db250YWluZXIuYXBwZW5kKHNlY3Rpb25IZWFkZXIpO1xuICBhZGRTZWN0aW9uKFwiZGVmYXVsdFwiLCBtYWluQ29udGFpbmVyLCB0YXNrc0R1ZVRvZGF5KTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdG9kb1wiKS5yZW1vdmUoKTtcbn1cbiIsImltcG9ydCB7IGlzVG9kYXkgfSBmcm9tIFwiZGF0ZS1mbnNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRvZG8odGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkge1xuICBjb25zdCBfdGl0bGUgPSB0aXRsZTtcbiAgY29uc3QgX2Rlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIGNvbnN0IF9kdWVEYXRlID0gZHVlRGF0ZTtcbiAgY29uc3QgX3ByaW9yaXR5ID0gcHJpb3JpdHk7XG4gIGNvbnN0IHNldFRpdGxlID0gKG5ld1RpdGxlKSA9PiB7XG4gICAgX3RpdGxlID0gbmV3VGl0bGU7XG4gIH07XG4gIGNvbnN0IHNldERlc2NyaXB0aW9uID0gKG5ld0Rlc2NyaXB0aW9uKSA9PiB7XG4gICAgX2Rlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG4gIH07XG5cbiAgY29uc3Qgc2V0RHVlRGF0ZSA9IChuZXdEYXRlKSA9PiB7XG4gICAgX2R1ZURhdGUgPSBuZXdEYXRlO1xuICB9O1xuICBjb25zdCBzZXRQcmlvcml0eSA9IChuZXdQcmlvcml0eUxldmVsKSA9PiB7XG4gICAgX3ByaW9yaXR5ID0gbmV3UHJpb3JpdHlMZXZlbDtcbiAgfTtcblxuICBjb25zdCBnZXRUaXRsZSA9ICgpID0+IF90aXRsZTtcbiAgY29uc3QgZ2V0RGVzY3JpcHRpb24gPSAoKSA9PiBfZGVzY3JpcHRpb247XG4gIGNvbnN0IGdldER1ZURhdGUgPSAoKSA9PiBfZHVlRGF0ZTtcbiAgY29uc3QgZ2V0UHJpb3JpdHkgPSAoKSA9PiBfcHJpb3JpdHk7XG4gIGNvbnN0IGlzRHVlVG9kYXkgPSAoKSA9PiBpc1RvZGF5KF9kdWVEYXRlKTtcbiAgcmV0dXJuIHtcbiAgICBzZXRUaXRsZSxcbiAgICBzZXREZXNjcmlwdGlvbixcbiAgICBzZXREdWVEYXRlLFxuICAgIHNldFByaW9yaXR5LFxuICAgIGdldFRpdGxlLFxuICAgIGdldERlc2NyaXB0aW9uLFxuICAgIGdldFByaW9yaXR5LFxuICAgIGdldER1ZURhdGUsXG4gICAgaXNEdWVUb2RheSxcbiAgfTtcbn1cbiIsImltcG9ydCB7IHN0YXJ0T2ZEYXkgfSBmcm9tIFwiLi9zdGFydE9mRGF5Lm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIGlzU2FtZURheVxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIGRheSAoYW5kIHllYXIgYW5kIG1vbnRoKT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgZGF5IChhbmQgeWVhciBhbmQgbW9udGgpP1xuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlTGVmdCAtIFRoZSBmaXJzdCBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0gZGF0ZVJpZ2h0IC0gVGhlIHNlY29uZCBkYXRlIHRvIGNoZWNrXG5cbiAqIEByZXR1cm5zIFRoZSBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgZGF5IChhbmQgeWVhciBhbmQgbW9udGgpXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFyZSA0IFNlcHRlbWJlciAwNjowMDowMCBhbmQgNCBTZXB0ZW1iZXIgMTg6MDA6MDAgaW4gdGhlIHNhbWUgZGF5P1xuICogY29uc3QgcmVzdWx0ID0gaXNTYW1lRGF5KG5ldyBEYXRlKDIwMTQsIDgsIDQsIDYsIDApLCBuZXcgRGF0ZSgyMDE0LCA4LCA0LCAxOCwgMCkpXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDQgU2VwdGVtYmVyIGFuZCA0IE9jdG9iZXIgaW4gdGhlIHNhbWUgZGF5P1xuICogY29uc3QgcmVzdWx0ID0gaXNTYW1lRGF5KG5ldyBEYXRlKDIwMTQsIDgsIDQpLCBuZXcgRGF0ZSgyMDE0LCA5LCA0KSlcbiAqIC8vPT4gZmFsc2VcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDQgU2VwdGVtYmVyLCAyMDE0IGFuZCA0IFNlcHRlbWJlciwgMjAxNSBpbiB0aGUgc2FtZSBkYXk/XG4gKiBjb25zdCByZXN1bHQgPSBpc1NhbWVEYXkobmV3IERhdGUoMjAxNCwgOCwgNCksIG5ldyBEYXRlKDIwMTUsIDgsIDQpKVxuICogLy89PiBmYWxzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lRGF5KGRhdGVMZWZ0LCBkYXRlUmlnaHQpIHtcbiAgY29uc3QgZGF0ZUxlZnRTdGFydE9mRGF5ID0gc3RhcnRPZkRheShkYXRlTGVmdCk7XG4gIGNvbnN0IGRhdGVSaWdodFN0YXJ0T2ZEYXkgPSBzdGFydE9mRGF5KGRhdGVSaWdodCk7XG5cbiAgcmV0dXJuICtkYXRlTGVmdFN0YXJ0T2ZEYXkgPT09ICtkYXRlUmlnaHRTdGFydE9mRGF5O1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGlzU2FtZURheTtcbiIsImltcG9ydCB7IGlzU2FtZURheSB9IGZyb20gXCIuL2lzU2FtZURheS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBpc1RvZGF5XG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIHRvZGF5P1xuICogQHB1cmUgZmFsc2VcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIHRvZGF5P1xuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIGRhdGUgdG8gY2hlY2tcbiAqXG4gKiBAcmV0dXJucyBUaGUgZGF0ZSBpcyB0b2RheVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyA2IE9jdG9iZXIgMjAxNCwgaXMgNiBPY3RvYmVyIDE0OjAwOjAwIHRvZGF5P1xuICogY29uc3QgcmVzdWx0ID0gaXNUb2RheShuZXcgRGF0ZSgyMDE0LCA5LCA2LCAxNCwgMCkpXG4gKiAvLz0+IHRydWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVG9kYXkoZGF0ZSkge1xuICByZXR1cm4gaXNTYW1lRGF5KGRhdGUsIERhdGUubm93KCkpO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGlzVG9kYXk7XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgc3RhcnRPZkRheVxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSBkYXkgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBvcmlnaW5hbCBkYXRlXG4gKlxuICogQHJldHVybnMgVGhlIHN0YXJ0IG9mIGEgZGF5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIGRheSBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gVHVlIFNlcCAwMiAyMDE0IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mRGF5KGRhdGUpIHtcbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIF9kYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gX2RhdGU7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgc3RhcnRPZkRheTtcbiIsIi8qKlxuICogQG5hbWUgdG9EYXRlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBpdHMgY2xvbmUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGEgbnVtYmVyLCBpdCBpcyB0cmVhdGVkIGFzIGEgdGltZXN0YW1wLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBub25lIG9mIHRoZSBhYm92ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgSW52YWxpZCBEYXRlLlxuICpcbiAqICoqTm90ZSoqOiAqYWxsKiBEYXRlIGFyZ3VtZW50cyBwYXNzZWQgdG8gYW55ICpkYXRlLWZucyogZnVuY3Rpb24gaXMgcHJvY2Vzc2VkIGJ5IGB0b0RhdGVgLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBhcmd1bWVudCAtIFRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKlxuICogQHJldHVybnMgVGhlIHBhcnNlZCBkYXRlIGluIHRoZSBsb2NhbCB0aW1lIHpvbmVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ2xvbmUgdGhlIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSB0b0RhdGUobmV3IERhdGUoMjAxNCwgMSwgMTEsIDExLCAzMCwgMzApKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29udmVydCB0aGUgdGltZXN0YW1wIHRvIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSB0b0RhdGUoMTM5MjA5ODQzMDAwMClcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0RhdGUoYXJndW1lbnQpIHtcbiAgY29uc3QgYXJnU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50KTtcblxuICAvLyBDbG9uZSB0aGUgZGF0ZVxuICBpZiAoXG4gICAgYXJndW1lbnQgaW5zdGFuY2VvZiBEYXRlIHx8XG4gICAgKHR5cGVvZiBhcmd1bWVudCA9PT0gXCJvYmplY3RcIiAmJiBhcmdTdHIgPT09IFwiW29iamVjdCBEYXRlXVwiKVxuICApIHtcbiAgICAvLyBQcmV2ZW50IHRoZSBkYXRlIHRvIGxvc2UgdGhlIG1pbGxpc2Vjb25kcyB3aGVuIHBhc3NlZCB0byBuZXcgRGF0ZSgpIGluIElFMTBcbiAgICByZXR1cm4gbmV3IGFyZ3VtZW50LmNvbnN0cnVjdG9yKCthcmd1bWVudCk7XG4gIH0gZWxzZSBpZiAoXG4gICAgdHlwZW9mIGFyZ3VtZW50ID09PSBcIm51bWJlclwiIHx8XG4gICAgYXJnU3RyID09PSBcIltvYmplY3QgTnVtYmVyXVwiIHx8XG4gICAgdHlwZW9mIGFyZ3VtZW50ID09PSBcInN0cmluZ1wiIHx8XG4gICAgYXJnU3RyID09PSBcIltvYmplY3QgU3RyaW5nXVwiXG4gICkge1xuICAgIC8vIFRPRE86IENhbiB3ZSBnZXQgcmlkIG9mIGFzP1xuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gVE9ETzogQ2FuIHdlIGdldCByaWQgb2YgYXM/XG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIH1cbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCB0b0RhdGU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBOYXZiYXIgZnJvbSBcIi4vbmF2YmFyLmpzXCI7XG5pbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0LmpzXCI7XG5pbXBvcnQgcmVuZGVyUHJvamVjdFNlY3Rpb24gZnJvbSBcIi4vcHJvamVjdFNlY3Rpb24uanNcIjtcbmltcG9ydCByZW5kZXJUb2RheVNlY3Rpb24gZnJvbSBcIi4vdG9kYXlTZWN0aW9uLmpzXCI7XG5pbXBvcnQgc3RvcmVkUHJvamVjdHMgZnJvbSBcIi4vc3RvcmVkUHJvamVjdHMuanNcIjtcbmltcG9ydCByZW5kZXJQcm9qZWN0Rm9ybSBmcm9tIFwiLi9wcm9qZWN0Rm9ybS5qc1wiO1xuY29uc3QgcHJvamVjdCA9IFByb2plY3QoXCJNeSBQcm9qZWN0XCIpO1xuc3RvcmVkUHJvamVjdHMuYWRkUHJvamVjdChwcm9qZWN0KTtcbnByb2plY3QuYWRkU3Vic2VjdGlvbihcIk15IHN1YnNlY3Rpb25cIik7XG5mb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICBwcm9qZWN0LmFkZFRhc2tUb1N1YnNlY3Rpb24oXG4gICAgXCJkZWZhdWx0XCIsXG4gICAgXCJDbGVhbiBUaGUgaG91c2VcIixcbiAgICBcIm9cIixcbiAgICBcIkF1Z3VzdCAyNFwiLFxuICAgIFwiM1wiXG4gICk7XG59XG5mb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICBwcm9qZWN0LmFkZFRhc2tUb1N1YnNlY3Rpb24oXG4gICAgXCJNeSBzdWJzZWN0aW9uXCIsXG4gICAgXCJDbGVhbiBUaGUgaG91c2VcIixcbiAgICBcIm9cIixcbiAgICBcIkF1Z3VzdCAyNFwiLFxuICAgIFwiM1wiXG4gICk7XG59XG5zdG9yZWRQcm9qZWN0cy5hZGRQcm9qZWN0KHByb2plY3QpO1xuXG5jb25zdCBtYWluQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWNvbnRhaW5lclwiKTtcbk5hdmJhcihzdG9yZWRQcm9qZWN0cy5nZXRQcm9qZWN0cygpKTtcbmNvbnN0IHRvZGF5VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZGF5XCIpO1xuY29uc3QgcHJvamVjdEhlYWRlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3RcIik7XG50b2RheVRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxuICByZW5kZXJUb2RheVNlY3Rpb24obWFpbkNvbnRhaW5lciwgcHJvamVjdC5nZXRTdWJzZWN0aW9uVGFza3MoXCJNeSBzdWJzZWN0aW9uXCIpKVxuKTtcblxucHJvamVjdEhlYWRlcnMuZm9yRWFjaCgocHJvamVjdEhlYWRlcikgPT4ge1xuICBwcm9qZWN0SGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgcmVuZGVyUHJvamVjdFNlY3Rpb24oXG4gICAgICBtYWluQ29udGFpbmVyLFxuICAgICAgc3RvcmVkUHJvamVjdHMuZ2V0UHJvamVjdChwcm9qZWN0SGVhZGVyLmRhdGFzZXQucHJvamVjdE5hbWUpXG4gICAgKTtcbiAgfSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==