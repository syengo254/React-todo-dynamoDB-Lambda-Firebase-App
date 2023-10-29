import { Task, UseTasks } from "../hooks/useTasks";

export default function TaskItem({ taskId, index }: { taskId: Task['id'], index: number }) {
  const { updateTask, deleteTask, tasks } = UseTasks();

  const task = tasks.find(t => t.id === taskId);

  if (!task) return null;

  return (
    <li key={`${task?.id}${task?.title}`}>
      <div className='task-name'>
        <div>{index + 1}. {task?.title}</div>
        <label>
          Mark complete:
          <input
            type='checkbox'
            id={'check' + task?.id}
            checked={task?.completed}
            onChange={() => updateTask(task as Task)} /></label>
      </div>
      <button
        onClick={() => window.confirm("Are you sure you want to delete the task\n'" + task?.title + "'?") && deleteTask(task?.id)}
        type='button'>
        &times;
      </button>
    </li>
  );
}
