import React, { FormEvent } from "react";

import UseAuth from "../hooks/useAuth";
import { UseTasks } from "../hooks/useTasks";
import { UIState } from "../utils/constants";

export default function CreateTask({ uiState, setUIstate }: { uiState: string, setUIstate: React.Dispatch<React.SetStateAction<string | null>> }) {
  const { user, SignOut } = UseAuth();

  const { createTask, tasksError, loading } = UseTasks();

  const [title, setTitle] = React.useState('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (title.length < 5) return;

    setUIstate(UIState.loading);
    createTask(title).then(() => {
      setUIstate(UIState.idle);
      setTitle('');
    }).catch(e => console.log(e));
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
              disabled={uiState === UIState.updating} />
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
