import React from "react";

import CreateTask from "../components/CreateTask";

const TaskList = React.lazy(() => import("../components/TaskList"));

export const UIState = {
  idle: null,
  loading: 'loading tasks',
  updating: 'updating tasks',
  error: 'an error occured loading tasks',
}

export default function TasksPage() {
  const [uiState, setUIstate] = React.useState<string | null>(UIState.idle);

  return (
    <>
      <CreateTask uiState={uiState as string} setUIstate={setUIstate} />
      <React.Suspense fallback={<div>Loading...</div>}>
        <TaskList uiState={uiState as string} />
      </React.Suspense>
    </>
  )
}
