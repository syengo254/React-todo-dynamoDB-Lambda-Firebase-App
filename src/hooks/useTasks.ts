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
  const { user } = UseAuth();

  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [tasksError, setTasksError] = React.useState<unknown>(null);

  const fetchTasks = async () => {
    const tasksCollectionRef = collection(db, "tasks");
    // console.log('fetching tasks...');

    const fetchedTasks = [] as Task[];
    try {
      const snapshot = await getDocs(tasksCollectionRef);
      snapshot.docs.forEach((doc) => {
        fetchedTasks.push({ ...doc.data(), id: doc.id } as Task);
      });
      return fetchedTasks;
    } catch (e) {
      setTasksError(e);
    }
  };

  const createTask = async (title: string) => {
    const newTask: Task = {
      title: title,
      completed: false
    }

    try {
      const docRef = await addDoc(collection(db, "tasks"), newTask)
      //console.log("added new task with ID:", docRef.id);

      newTask.id = docRef.id;
      setTasks((oldTasks) => ([
        newTask,
        ...oldTasks
      ]));
    } catch (e) {
      console.log(e);
    }
  };

  const updateTask = (task: Task) => {
    const updatedRef = doc(db, "tasks/" + task.id);

    updateDoc(updatedRef, { completed: !task.completed })
      .then(() => {
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
        // console.log('task with id:', task.id, 'marked', !task.completed ? "complete" : "uncomplete");
      })
      .catch(e => {
        console.log(e);
      });
  }

  const deleteTask = (taskId: Task['id']) => {
    const taskUpdate = doc(db, "tasks/" + taskId);
    deleteDoc(taskUpdate)
      .then(() => {
        // console.log('removed task with id', taskId);
        setTasks((oldTasks) => {
          return oldTasks.filter(({ id }) => id !== taskId);
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  React.useEffect(() => {
    if (user) {
      fetchTasks()
        .then((ftasks) => {
          setTasks(ftasks as Task[]);
        })
        .catch(e => {
          setTasksError(e);
          console.log(e);
        });
    }
  }, [user])

  return { tasks, createTask, updateTask, deleteTask, tasksError };
}
