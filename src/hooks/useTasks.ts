import React from 'react';

import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from "../firebase";
import UseAuth from './useAuth';

export type Task = {
  id?: number | string;
  title: string;
  completed: boolean;
}

export function UseTasks() {
  const { user, isLoggedIn } = UseAuth();

  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [tasksError, setTasksError] = React.useState<unknown>(null);

  const createTask = async (title: string) => {
    const newTask: Task = {
      title: title,
      completed: false
    }

    try {
      const docRef = await addDoc(collection(db, "tasks"), newTask)

      console.log("added new task with ID:", docRef.id);

      newTask.id = docRef.id;
      setTasks((oldTasks) => ([
        newTask,
        ...oldTasks
      ]));
    } catch (e) {
      console.log(e);
    }
  };

  const updateTask = async (task: Task) => {
    const updatedRef = doc(db, "tasks/" + task.id);

    try {
      await updateDoc(updatedRef, { completed: !task.completed });
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
      console.log('task with id:', task.id, 'marked', !task.completed ? "uncomplete" : "complete");
    } catch (e) {
      console.log(e);
    }
  }

  const deleteTask = async (taskId: Task['id']) => {
    const taskUpdate = doc(db, "tasks/" + taskId);
    try {
      await deleteDoc(taskUpdate);
      console.log('removed task with id', taskId);

      setTasks((oldTasks) => {
        return oldTasks.filter(({ id }) => id !== taskId);
      });
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    const getTasks = async () => {
      const tasksCollectionRef = collection(db, "tasks");
      console.log('fetching tasks...')
      await getDocs(tasksCollectionRef)
        .then((snapshot) => setTasks(snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id } as Task;
        })))
        .catch(e => {
          setTasksError(e);
        });
    };

    if (isLoggedIn || user) {
      getTasks
    }
  }, [isLoggedIn, user]);

  return { tasks, createTask, updateTask, deleteTask, tasksError };
}
