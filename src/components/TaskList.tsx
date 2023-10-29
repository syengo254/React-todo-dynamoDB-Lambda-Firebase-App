import TaskItem from './TaskItem';

import { UIState } from "../pages/Tasks";
import { UseTasks } from '../hooks/useTasks';

export default function TaskList({ uiState }: { uiState: string }) {
  const { tasks } = UseTasks();

  return (
    <div className='task-list'>
      <h4 style={{ margin: '0.4rem 0' }}>Your tasks:</h4>
      {!tasks.length && <span className='no-tasks'>
        {uiState == UIState.loading ? "Fetching tasks, please wait..." : "You have no tasks"}
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
