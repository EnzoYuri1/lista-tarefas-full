// Lógica de negócio: ações, criação, reducer e contagem. Sem UI.

export const TASK_ACTIONS = {
  ADD_TASK: 'ADD_TASK',
  TOGGLE_TASK: 'TOGGLE_TASK',
};

export const initialTaskState = { tasks: [] };

export function createTask(title) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    isCompleted: false,
  };
}

// Tarefas não alteradas mantêm a MESMA referência (essencial para o React.memo).
export function taskReducer(state, action) {
  switch (action.type) {
    case TASK_ACTIONS.ADD_TASK:
      return { tasks: [createTask(action.payload), ...state.tasks] };
    case TASK_ACTIONS.TOGGLE_TASK:
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, isCompleted: !task.isCompleted }
            : task
        ),
      };
    default:
      return state;
  }
}

export function countTasks(tasks) {
  const completed = tasks.filter((task) => task.isCompleted).length;
  return { completed, pending: tasks.length - completed };
}
