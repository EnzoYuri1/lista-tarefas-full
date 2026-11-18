import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

// Exibe UMA tarefa. React.memo: só renderiza de novo se task/onToggleTask mudarem.
function TaskItem({ task, onToggleTask }) {
  // Prova da memoização: ao concluir uma tarefa, só ela deve logar.
  console.log('Renderizou TaskItem: ' + task.title);

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onToggleTask(task.id)}
      activeOpacity={0.7}
    >
      <View style={[styles.check, task.isCompleted && styles.checkDone]}>
        {task.isCompleted && <Text style={styles.checkMark}>✓</Text>}
      </View>
      <Text style={[styles.title, task.isCompleted && styles.titleDone]}>
        {task.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111a2e',
    borderWidth: 1,
    borderColor: '#1e2a44',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkDone: { backgroundColor: '#3b82f6' },
  checkMark: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  title: { flex: 1, fontSize: 16, color: '#e2e8f0' },
  titleDone: { textDecorationLine: 'line-through', color: '#64748b' },
});

export default React.memo(TaskItem);
