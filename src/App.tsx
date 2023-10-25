import './App.css'

type Task = {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const tasks: Task[] = [
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
  ];

  const onSubmit = (event) => {
    // todo
  }

  return (
    <div>
      <h3>React Todo App + Firebase + Firestore</h3>
      <div className='task-form'>
        <h4>Create a task</h4>
        <form onSubmit={onSubmit}>
          <div className='task-input'>
            <label htmlFor="task-name">Task name:</label>
            <input type="text" id="task-name" placeholder='Type your task here' />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
      <div className='task-list'>
        {!tasks.length && <span className='no-tasks'>You have no tasks</span>}
        {tasks.length > 1 && (
          <ul>
            {
              tasks.map((task, index) => {
                return (
                  <li key={task.id + task.title}>
                    <div className='task-name'>
                      <div>{index + 1}. {task.title}</div>
                      <label>Mark complete: <input type='checkbox' checked={task.completed} /></label>
                    </div>
                    <button type='button'>&times;</button>
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
