export default function Todo(title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  const setTitle = (newTitle) => {
    this.title = newTitle;
  };
  const setDescription = (newDescription) => {
    this.description = newDescription;
  };

  const setDueDate = (newDate) => {
    this.dueDate = newDate;
  };
  const setPriority = (newPriorityLevel) => {
    this.priority = newPriorityLevel;
  };

  const getTitle = () => {
    this.title;
  };
  const getDescription = () => this.description;
  const getDueDate = () => this.dueDate;
  const getPriority = () => this.priority;
  return {
    setTitle,
    setDescription,
    setDueDate,
    setPriority,
    getTitle,
    getDescription,
    getPriority,
    getDueDate,
  };
}
