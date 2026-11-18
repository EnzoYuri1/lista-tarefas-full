import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import TaskItem from './TaskItem';

// Apenas exibe a lista; não conhece regras de negócio.
function TaskList({ tasks, onToggleTask }) {
  if (tasks.length === 0) {
    return <Text style={styles.empty}>Nenhuma tarefa cadastrada ainda.</Text>;
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(task) => task.id}
      renderItem={({ item }) => (
        <TaskItem task={item} onToggleTask={onToggleTask} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  empty: { textAlign: 'center', color: '#64748b', marginTop: 32 },
});

export default React.memo(TaskList);
