import { isToday, format } from "date-fns";
export default function Todo(title, description, dueDate, priority) {
  const _title = title;
  let _description = description;
  let _dueDate = getDate(dueDate);
  let _priority = priority;

  function getDate(dueDate) {
    if (dueDate instanceof Date) {
      return dueDate;
    } else {
      const splitDate = dueDate.split("-");
      return new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
    }
  }
  const setDescription = (newDescription) => {
    _description = newDescription;
  };

  const setDueDate = (newDate) => {
    _dueDate = getDate(newDate);
  };
  const setPriority = (newPriorityLevel) => {
    _priority = newPriorityLevel;
  };

  const getTitle = () => _title;
  const getDescription = () => _description;
  const getDueDate = () => format(new Date(_dueDate), "MMMM dd");
  const getPriority = () => _priority;
  const isDueToday = () => isToday(_dueDate);
  const toJSON = () => {
    return {
      title: _title,
      description: _description,
      date: format(_dueDate, "yyyy-MM-dd"),
      priority: _priority,
    };
  };
  return {
    toJSON,
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
