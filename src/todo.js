export default Todo(title, description, dueDate, priority) {
    const setTitle = (newTitle) => {
        this.title = newTitle;
    }
    const setDescription = (newDescription) => {
        this.description = newDescription;
    }
    const setPriority = (newPriorityLevel) => {
        this.priority = newPriorityLevel;
    }
    return {title, description, dueDate, priority}
}