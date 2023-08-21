export default addNavBar(projects) {
    const leftContainer = document.querySelector(".left-container");
    addTodaySection(leftContainer);
    addProjectsSection(leftContainer);
}

function addTodaySection(parent) {
    const container = document.createElement("div");
    container.classList.add("today-section", "header")
}
