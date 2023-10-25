import React, { FormEvent } from 'react';

import { collection, addDoc, getDocs } from 'firebase/firestore';

import { db } from './firebase';

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

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (taskTitle.length < 5) return;

    const newTask: Task = {
      title: taskTitle,
      completed: false
    }

    try {
      const docRef = await addDoc(tasksCollectionRef, newTask)
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

  const removeTask = (taskId: Task['id']) => {
    console.log('removing task with id', taskId);
    setTasks((oldTasks) => {
      return oldTasks.filter(({ id }) => id !== taskId);
    });
  }

  const markComplete = (taskId: Task['id']) => {
    console.log('task with id', taskId, 'to be marked');
    setTasks((oldTasks) => {
      return oldTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task, completed: !task.completed
          }
        }
        return task;
      });
    });
  }

  React.useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(tasksCollectionRef);
      setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Task[]);
    };

    getTasks();
  }, []);

  return (
    <div>
      <h3>React Todo App + Firebase + Firestore</h3>
      <div className='task-form'>
        <h4>Create a task</h4>
        <form onSubmit={onSubmit}>
          <div className='task-input'>
            <label htmlFor="task-name">Task name:</label>
            <input type="text" id="task-name" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder='Type your task here' />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
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
                      <label>Mark complete: <input type='checkbox' id={'check' + task.id} checked={task.completed} onChange={() => markComplete(task.id)} /></label>
                    </div>
                    <button onClick={() => removeTask(task.id)} type='button'>&times;</button>
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
