import renderNavbar from "./navbar.js";
import storedProjects from "./storedProjects.js";
import addEditDialog from "./dialog.js";

addEditDialog();
const leftContainer = document.createElement("div");
leftContainer.classList.add("left-container");
const mainContainer = document.createElement("div");
mainContainer.classList.add("main-container");
document.querySelector("body").append(leftContainer, mainContainer);
renderNavbar(storedProjects.getProjects());
