import { isToday } from "date-fns";
export default function Todo(title, description, dueDate, priority) {
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
  const isDueToday = () => isToday(_dueDate);
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
