import { Task, UseTasks } from "../hooks/useTasks";

export default function TaskItem({ task, index }: { task: Task, index: number }) {
  const { updateTask, deleteTask } = UseTasks();

  return (
    <li key={`${task.id}${task.title}`}>
      <div className='task-name'>
        <div>{index + 1}. {task?.title}</div>
        <label>
          Mark complete:
          <input
            type='checkbox'
            id={'check' + task.id}
            checked={task.completed}
            onChange={() => {
              if (typeof task == "object") {
                updateTask(task);
              }
            }} /></label>
      </div>
      <button
        onClick={() => window.confirm("Are you sure you want to delete the task\n'" + task?.title + "'?") &&
          deleteTask(task.id)}
        type='button'>
        &times;
      </button>
    </li>
  );
}

TaskItem.defaultProps = {
  task: {}
}
