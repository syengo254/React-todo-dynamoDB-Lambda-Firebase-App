import React from 'react';

import { addDoc, updateDoc, doc, deleteDoc, collection } from 'firebase/firestore';
import firebase, { db } from "../firebase";
import UseAuth from './useAuth';

export type Task = {
  id?: number | string;
  title: string;
  completed: boolean;
}

export function UseTasks() {
  const { user, setUnsubscribe } = UseAuth();

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
      const docRef = await addDoc(collection(db, "tasks"), newTask)
      console.log("added new task with ID:", docRef.id);
    } catch (e) {
      console.log(e);
      setTasksError(e as Error)
    } finally {
      setLoading(false);
    }
  };

  const updateTask = (task: Task) => {
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
    const taskUpdate = doc(db, "tasks/" + taskId);
    setLoading(true);
    deleteDoc(taskUpdate)
      .catch(e => {
        console.log(e);
      }).finally(() => setLoading(false));
  };

  React.useEffect(() => {
    const tasksRef = firebase.firestore().collection("tasks");

    setLoading(true);

    const unsub = tasksRef.onSnapshot((qSnapshot) => {
      const _tasks: unknown[] = [];
      qSnapshot.forEach((doc) => {
        _tasks.push({ ...doc.data(), id: doc.id });
      });
      setTasks(_tasks as Task[]);
      setLoading(false);
      setUnsubscribe(unsub);
    }, (error) => {
      setTasksError(error);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user ? { tasks, createTask, updateTask, deleteTask, tasksError, loading } : {};
}
