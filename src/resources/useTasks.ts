import React from "react";
import { Task } from "../App";

import { v4 as uuidv4 } from 'uuid'

const baseURL = "https://8x7n5wezl2.execute-api.eu-north-1.amazonaws.com/";

async function fetchTasks() {
  const response = await fetch(baseURL + 'tasks', { mode: 'cors' });
  const data = await response.json()

  return data;
}

export function UseTasks() {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  React.useEffect(() => {
    fetchTasks().then(results => setTasks(results));
  }, []);

  const deleteTask = async (taskId: Task['id']) => {
    const response = await fetch(baseURL + 'tasks/' + taskId, { mode: 'cors', method: 'DELETE' });

    if (response.ok) {
      console.log('removing task with id', taskId);
      setTasks((oldTasks) => {
        return oldTasks.filter(({ id }) => id !== taskId);
      });
    }
  }

  const createTask = async (task: Task) => {

    task.id = uuidv4();

    const response = await fetch(baseURL + 'tasks', { mode: 'cors', method: 'PUT', body: JSON.stringify(task) });

    if (response.ok) {
      setTasks((oldTasks) => ([
        { ...task },
        ...oldTasks
      ]));
    }
  }

  const updateTask = async (task: Task) => {
    const response = await fetch(baseURL + 'tasks', { mode: 'cors', method: 'PUT', body: JSON.stringify({ ...task, completed: !task.completed }) });

    if (response.ok) {
      setTasks((ot) => {
        return ot.map((t) => {
          if (t.id === task.id) {
            return { ...task, completed: !task.completed };
          }
          return t;
        })
      });
    }
  }

  return { tasks, setTasks, deleteTask, createTask, updateTask };
}
