import TaskItem from './TaskItem';

import { UseTasks } from '../hooks/useTasks';

export default function TaskList() {
  const { tasks, loading } = UseTasks();

  return (
    <div className='task-list'>
      <h4 style={{ margin: '0.4rem 0' }}>Your tasks:</h4>
      {!tasks.length && <span className='no-tasks'>
        {loading ? "Fetching tasks, please wait..." : "You have no tasks"}
      </span>}
      {tasks.length > 0 && (
        <ul>
          {
            tasks.map((task, index) => <TaskItem key={task.id + task.title} taskId={task.id} index={index} />)
          }
        </ul>
      )}
    </div>
  );
}
