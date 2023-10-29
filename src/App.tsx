import React from "react";

import UseAuth from './hooks/useAuth';

import './App.css';
import LoginPage from './pages/Login';
const TasksPage = React.lazy(() => import('./pages/Tasks'));

function App() {
  const { isLoggedIn, checkingAuth } = UseAuth();

  if (checkingAuth) {
    return null;
  }
  console.log(isLoggedIn)

  return (
    <div>
      <h3>React Todo App + Firebase + Firestore</h3>
      {isLoggedIn ?
        <React.Suspense fallback={<div>Loading...</div>}>
          <TasksPage />
        </React.Suspense>
        : <LoginPage />}
    </div>
  )
}

export default App
