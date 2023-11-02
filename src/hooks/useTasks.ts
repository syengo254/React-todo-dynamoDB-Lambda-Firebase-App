import React from 'react';

import { updateDoc, doc } from 'firebase/firestore';
import firebase, { db } from "../firebase";
import UseAuth from './useAuth';

export type Task = {
  id?: number | string;
  title: string;
  completed: boolean;
}

export function UseTasks() {
  const { user } = UseAuth();

  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [tasksError, setTasksError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState(false);

  const createTask = async (title: string) => {
    const newTask: Task = {
      title: title,
      completed: false
    }

    try {
      setLoading(true);
      const createFunc = firebase.functions().httpsCallable('createTask');

      const docRef = await createFunc({ task: newTask });
      console.log("added new task with ID:", docRef.data._path.segments[1]);
    } catch (e) {
      console.log(e);
      setTasksError(e as Error)
    } finally {
      setLoading(false);
    }
  };

  const updateTask = (task: Task) => {
    if (task === undefined) return;
    const updatedRef = doc(db, "tasks/" + task.id);

    setLoading(true);
    updateDoc(updatedRef, { completed: !task.completed })
      .then(() => {
        console.log('task with id:', task.id, 'marked', !task.completed ? "complete" : "uncomplete");
      })
      .catch(e => {
        console.log(e);
      }).finally(() => {
        setLoading(false);
      });
  }

  const deleteTask = (taskId: Task['id']) => {
    setLoading(true);
    firebase.functions().httpsCallable('deleteTask')({ taskId })
      .then((res) => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      }).finally(() => setLoading(false));
  };

  React.useEffect(() => {
    const tasksRef = firebase.firestore().collection("tasks");

    setLoading(true);

    tasksRef.onSnapshot((qSnapshot) => {
      const _tasks = [] as Task[];
      qSnapshot.forEach((doc) => {
        _tasks.push({ ...doc.data(), id: doc.id } as Task);
      });
      setTasks(_tasks);
      setLoading(false);
    }, (error) => {
      setTasksError(error);
    });
  }, []);

  return { tasks: user ? tasks : [], createTask, updateTask, deleteTask, tasksError, loading };
}
