import React, { FormEvent } from 'react';

import UseAuth from './hooks/useAuth';
import { UseTasks } from './hooks/useTasks';

import './App.css';

const UIState = {
  idle: null,
  loading: 'loading tasks',
  updating: 'updating tasks',
  error: 'an error occured loading tasks',
}

function App() {
  const { user, isLoggedIn, SignIn, SignOut } = UseAuth();
  const { tasks, createTask, updateTask, deleteTask } = UseTasks();

  const [title, setTitle] = React.useState('');
  const [uiState, setUIstate] = React.useState<string | null>(UIState.idle);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (title.length < 5) return;

    setUIstate(UIState.loading);
    createTask(title).then(() => {
      setUIstate(UIState.idle);
    }).catch(e => console.log(e));
  }

  return (
    <div>
      <h3>React Todo App + Firebase + Firestore</h3>
      <div style={{ marginBottom: '.5rem' }}>
        {isLoggedIn ?
          <>
            <span>Hi, {user?.displayName}</span>
            <button style={{ marginLeft: '.5rem' }} onClick={SignOut}>Sign Out</button>
          </> :
          <button className='login-with-google-btn' onClick={SignIn}>Sign in with Google</button>}
      </div>
      {isLoggedIn && <div className='task-form'>
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
            <button type="submit">Add</button>
          </div>
        </form>
      </div>}
      {isLoggedIn ? <div className='task-list'>
        <h4 style={{ margin: '0.4rem 0' }}>You tasks:</h4>
        {!tasks.length && <span className='no-tasks'>
          {uiState == UIState.loading ? "Fetching tasks, please wait..." : "You have no tasks"}
        </span>}
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
                          onChange={() => updateTask(task)} /></label>
                    </div>
                    <button onClick={() => deleteTask(task.id)} type='button'>&times;</button>
                  </li>
                )
              })
            }
          </ul>
        )}
      </div> :
        <div>Sign in first to view your tasks.</div>}
    </div>
  )
}

export default App
