import React, { FormEvent } from 'react';
import './App.css'

import { UseTasks } from './resources/useTasks';

export type Task = {
  id?: number | string;
  title: string;
  completed: boolean;
}

function App() {
  const {
    tasks,
    deleteTask,
    createTask,
    updateTask,
    loading,
    error } = UseTasks();

  const [newTask, setNewTask] = React.useState('');


  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (newTask.length < 5) return;

    await createTask({ title: newTask, completed: false });

    setNewTask('');
  }

  const removeTask = async (taskId: number) => {
    await deleteTask(taskId);
  }

  const markComplete = async (task: Task) => {
    await updateTask(task);
  }

  return (
    <div>
      <h3>React Todo App + Firebase + Firestore</h3>
      <div className='task-form'>
        <h4>Create a task</h4>
        <form onSubmit={onSubmit}>
          <div className='task-input'>
            <label htmlFor="task-name">Task name:</label>
            <input
              type="text"
              id="task-name"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder='Type your task here...'
              disabled={loading} />
          </div>
          <div>
            <button type="submit" disabled={loading && newTask.length > 0}>{(loading && newTask.length > 0) ? "Adding..." : "Add"}</button>
          </div>
        </form>
        {error && <p className='error'>{error}</p>}
      </div>
      <div className='task-list'>
        {!tasks.length && <span className='no-tasks'>You have no tasks</span>}
        {tasks.length > 0 && (
          <ul>
            {
              tasks.map((task, index) => {
                return (
                  <li key={task.id + task.title}>
                    <div className='task-name'>
                      <div>{index + 1}. {task.title}</div>
                      <label>
                        Mark complete:
                        <input
                          type='checkbox'
                          id={'check' + task.id}
                          checked={task.completed}
                          onChange={() => markComplete(task)}
                          disabled={loading} />
                      </label>
                    </div>
                    <button disabled={loading} onClick={() => removeTask(task.id as number)} type='button'>&times;</button>
                  </li>
                )
              })
            }
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
