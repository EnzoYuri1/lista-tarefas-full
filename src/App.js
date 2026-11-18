import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import TaskScreen from './screens/TaskScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0b1120" />
      <TaskScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0b1120' },
});
