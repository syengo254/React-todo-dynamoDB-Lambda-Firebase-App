import React from "react";
import { Task } from "../App";

import { v4 as uuidv4 } from 'uuid'

const baseURL = import.meta.env.VITE_APP_AWS_API_URL;

async function fetchTasks() {
  const response = await fetch(baseURL + '/tasks', { mode: 'cors' });
  const data = await response.json()

  return data;
}

export function UseTasks() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const createTask = async (task: Task) => {
    try {
      task.id = uuidv4();
      setLoading(true);
      const response = await fetch(baseURL + '/tasks', { mode: 'cors', method: 'PUT', body: JSON.stringify(task) });

      if (response.ok) {
        setTasks((oldTasks) => ([
          { ...task },
          ...oldTasks
        ]));
        setLoading(false);
        console.log(await response.text());
      }
    } catch (e) {
      setError((e as Error).message);
    }
  }

  const updateTask = async (task: Task) => {
    try {
      setLoading(true);
      const response = await fetch(baseURL + '/tasks', { mode: 'cors', method: 'PUT', body: JSON.stringify({ ...task, completed: !task.completed }) });

      if (response.ok) {
        setTasks((ot) => {
          return ot.map((t) => {
            if (t.id === task.id) {
              return { ...task, completed: !task.completed };
            }
            return t;
          })
        });
        setLoading(false);
      }
    } catch (e) {
      setError((e as Error).message);
    }
  }

  const deleteTask = async (taskId: Task['id']) => {
    try {
      setLoading(true);

      const response = await fetch(baseURL + '/tasks/' + taskId, { mode: 'cors', method: 'DELETE' });

      if (response.ok) {
        console.log('removing task with id', taskId);
        setTasks((oldTasks) => {
          return oldTasks.filter(({ id }) => id !== taskId);
        });
        setLoading(false);
      }
    } catch (e) {
      setError((e as Error).message);
    }
  }

  React.useEffect(() => {
    fetchTasks()
      .then(results => setTasks(results))
      .catch(e => setError((e as Error).message));
  }, []);

  return { tasks, setTasks, deleteTask, createTask, updateTask, loading, error };
}
