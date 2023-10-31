import React from "react";

import UseAuth from './hooks/useAuth';

import './App.css';
const LoginPage = React.lazy(() => import('./pages/Login'));
const TasksPage = React.lazy(() => import('./pages/Tasks'));

function App() {
  const { isLoggedIn, checkingAuth } = UseAuth();

  if (checkingAuth) {
    return null;
  }

  return (
    <div>
      <h3>React Todo App + Firebase + Firestore</h3>
      <React.Suspense fallback={<div>Loading...</div>}>
        {isLoggedIn ?
          <TasksPage />
          : <LoginPage />}
      </React.Suspense>
    </div>
  )
}

export default App
