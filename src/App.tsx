import React, { FormEvent } from 'react';
import './App.css'

type Task = {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [newTask, setNewTask] = React.useState('');

  const [tasks, setTasks] = React.useState<Task[]>([
    {
      id: 1,
      title: "Create a react firebase and firestore app",
      completed: false,
    },
    {
      id: 2,
      title: "Watch a tutorial on React and OpenAI API",
      completed: false,
    },
    {
      id: 3,
      title: "Create a react, aws amplify and dynamoDB apps",
      completed: false,
    },
  ]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (newTask.length < 5) return;

    setTasks((oldTasks) => ([
      {
        id: oldTasks.length > 0 ? (oldTasks[oldTasks.length - 1].id + 1) : 1,
        title: newTask,
        completed: false
      },
      ...oldTasks
    ]));

    setNewTask('');
  }

  const removeTask = (taskId: number) => {
    console.log('removing task with id', taskId);
    setTasks((oldTasks) => {
      return oldTasks.filter(({ id }) => id !== taskId);
    });
  }

  const markComplete = (taskId: number) => {
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

  return (
    <div>
      <h3>React Todo App + Firebase + Firestore</h3>
      <div className='task-form'>
        <h4>Create a task</h4>
        <form onSubmit={onSubmit}>
          <div className='task-input'>
            <label htmlFor="task-name">Task name:</label>
            <input type="text" id="task-name" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder='Type your task here' />
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
