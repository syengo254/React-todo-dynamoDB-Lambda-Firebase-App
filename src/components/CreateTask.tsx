import React, { FormEvent } from "react";

import UseAuth from "../hooks/useAuth";
import { UseTasks } from "../hooks/useTasks";

export default function CreateTask() {
  const { user, SignOut } = UseAuth();

  const { createTask, tasksError, loading } = UseTasks();

  const [title, setTitle] = React.useState('');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (title.length < 5) return;

    createTask && createTask(title);
    setTitle('');
  }

  return (
    <>
      <div style={{ marginBottom: '.5rem' }}>
        <span>Hi, {user?.displayName}</span>
        <button style={{ marginLeft: '.5rem' }} onClick={SignOut}>Sign Out</button>
      </div>
      <div className='task-form'>
        <h4>Create a task</h4>
        <form onSubmit={onSubmit}>
          <div className='task-input'>
            <label htmlFor="task-name">Task name:</label>
            <input
              type="text"
              id="task-name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Type your task here'
              disabled={loading} />
          </div>
          <div>
            <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add"}</button>
          </div>
        </form>
        {tasksError && <p style={{ display: 'block', marginBlock: '.2rem', color: 'red', fontStyle: 'italic' }}>{tasksError.message}</p>}
      </div>
    </>
  )
}
