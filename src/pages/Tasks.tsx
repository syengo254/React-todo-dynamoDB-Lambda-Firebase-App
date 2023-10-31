import { useState } from "react";

import CreateTask from "../components/CreateTask";

import TaskList from "../components/TaskList";
import { UIState } from "../utils/constants";

export default function TasksPage() {
  const [uiState, setUIstate] = useState<string | null>(UIState.idle);

  return (
    <>
      <CreateTask uiState={uiState as string} setUIstate={setUIstate} />
      <TaskList uiState={uiState as string} />
    </>
  )
}
