import { addSection } from "./projectSection";
export default function renderTodaySection(mainContainer, tasksDueToday) {
  mainContainer.innerHTML = "";
  const sectionHeader = document.createElement("h1");
  sectionHeader.classList.add("project-title");
  sectionHeader.textContent = "Today's todos";
  mainContainer.append(sectionHeader);
  addSection("default", mainContainer, tasksDueToday);
  document.querySelector(".add-todo").remove();
}
