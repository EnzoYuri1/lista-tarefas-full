import React, { useCallback, useMemo, useReducer, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TaskList from '../components/TaskList';
import {
  TASK_ACTIONS,
  countTasks,
  initialTaskState,
  taskReducer,
} from '../services/taskService';

// Contêiner: concentra estado e handlers; a UI vem dos componentes.
export default function TaskScreen() {
  // useReducer: lista de tarefas
  const [taskState, dispatch] = useReducer(taskReducer, initialTaskState);
  // useState: texto digitado
  const [taskText, setTaskText] = useState('');

  // useCallback: referência estável para o TaskItem memoizado
  const handleToggleTask = useCallback((taskId) => {
    dispatch({ type: TASK_ACTIONS.TOGGLE_TASK, payload: taskId });
  }, []);

  const handleAddTask = useCallback(() => {
    const title = taskText.trim();
    if (!title) return;
    dispatch({ type: TASK_ACTIONS.ADD_TASK, payload: title });
    setTaskText('');
  }, [taskText]);

  const { pending, completed } = useMemo(
    () => countTasks(taskState.tasks),
    [taskState.tasks]
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Lista de Tarefas</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa"
          placeholderTextColor="#64748b"
          value={taskText}
          onChangeText={setTaskText}
          onSubmitEditing={handleAddTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.counters}>
        <Text style={styles.counterText}>
          Pendentes: <Text style={styles.counterValue}>{pending}</Text>
        </Text>
        <Text style={styles.counterText}>
          Concluídas: <Text style={styles.counterValue}>{completed}</Text>
        </Text>
      </View>

      <TaskList tasks={taskState.tasks} onToggleTask={handleToggleTask} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginVertical: 20,
  },
  form: { flexDirection: 'row', gap: 8 },
  input: {
    flex: 1,
    backgroundColor: '#111a2e',
    borderWidth: 1,
    borderColor: '#1e2a44',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#e2e8f0',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  counters: { flexDirection: 'row', gap: 16, marginVertical: 18 },
  counterText: { color: '#64748b', fontSize: 14 },
  counterValue: { color: '#3b82f6', fontWeight: 'bold' },
});
