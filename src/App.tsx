import React, { FormEvent } from 'react';

import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

import { onAuthStateChanged } from 'firebase/auth'

import { db, auth, SignIn, SignOut } from './firebase';

import './App.css';

type Task = {
  id?: number | string;
  title: string;
  completed: boolean;
}

function App() {
  const tasksCollectionRef = collection(db, "tasks");
  const [taskTitle, setTaskTitle] = React.useState('');

  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [updating, setUpdating] = React.useState(false);
  const [loggedUser, setLoggedUser] = React.useState<unknown>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (taskTitle.length < 5) return;

    const newTask: Task = {
      title: taskTitle,
      completed: false
    }

    try {
      setUpdating(true);
      const docRef = await addDoc(tasksCollectionRef, newTask)
      setUpdating(false);
      console.log("added new task with ID:", docRef.id);

      newTask.id = docRef.id;

      setTasks((oldTasks) => ([
        newTask,
        ...oldTasks
      ]));

      setTaskTitle('');
    } catch (e) {
      console.log(e);
    }
  }

  const removeTask = async (taskId: Task['id']) => {
    console.log('removing task with id', taskId);

    if (!window.confirm("Are you sure?")) return;

    const taskUpdate = doc(tasksCollectionRef, taskId);
    await deleteDoc(taskUpdate);

    setTasks((oldTasks) => {
      return oldTasks.filter(({ id }) => id !== taskId);
    });
  }

  const markComplete = async (task: Task) => {
    console.log('task with id', task.id, 'to be marked');

    const taskUpdate = doc(tasksCollectionRef, task.id);
    await updateDoc(taskUpdate, { completed: !task.completed });

    setTasks((oldTasks) => {
      return oldTasks.map((itask) => {
        if (itask.id === task.id) {
          return {
            ...itask, completed: !itask.completed
          }
        }
        return itask;
      });
    });
  }

  if (!loggedUser) {
    onAuthStateChanged(auth, () => {
      setLoggedUser(auth.currentUser)
    });
  }

  async function login() {
    await SignIn();
  }

  async function logout() {
    await SignOut();
    setLoggedUser(null);
  }


  // effects
  React.useEffect(() => {
    if (loggedUser && !tasks.length) {
      const getTasks = async () => {
        setLoading(true);
        const data = await getDocs(tasksCollectionRef);
        setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Task[]);
        setLoading(false);
      };

      getTasks();
    }
  }, [loggedUser, tasks.length, tasksCollectionRef])

  return (
    <div>
      <h3>React Todo App + Firebase + Firestore</h3>
      <div style={{ marginBottom: '.5rem' }}>
        {loggedUser ?
          <><span>Hi, {auth.currentUser?.displayName}</span><button style={{ marginLeft: '.5rem' }} onClick={logout}>Sign Out</button></> :
          <button className='login-with-google-btn' onClick={login}>Sign in with Google</button>}
      </div>
      <div className='task-form'>
        <h4>Create a task</h4>
        <form onSubmit={onSubmit}>
          <div className='task-input'>
            <label htmlFor="task-name">Task name:</label>
            <input type="text" id="task-name" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder='Type your task here' disabled={updating} />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
      {loggedUser ? <div className='task-list'>
        <h4 style={{ margin: '0.4rem 0' }}>You tasks:</h4>
        {!tasks.length && <span className='no-tasks'>{loading ? "Fetching tasks, please wait..." : "You have no tasks"}</span>}
        {tasks.length > 0 && (
          <ul>
            {
              tasks.map((task, index) => {
                return (
                  <li key={task.id + task.title}>
                    <div className='task-name'>
                      <div>{index + 1}. {task.title}</div>
                      <label>Mark complete: <input type='checkbox' id={'check' + task.id} checked={task.completed} onChange={() => markComplete(task)} /></label>
                    </div>
                    <button onClick={() => removeTask(task.id)} type='button'>&times;</button>
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
