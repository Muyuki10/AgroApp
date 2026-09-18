import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function HistoryList({ history }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardHeader}>Histórico de Visitas (Offline)</Text>
      {history.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum registro local armazenado.</Text>
      ) : (
        history.map(item => (
          <View key={item.id} style={styles.historyCard}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyDate}>{item.date}</Text>
              <Text style={styles.badgeText}>SALVO</Text>
            </View>
            <View style={styles.historyDetails}>
              <Text style={styles.historySub}>GPS: {item.accuracy}</Text>
              <Text style={styles.historySub}>G-Max: {item.maxG}g</Text>
            </View>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  emptyText: {
    color: '#64748B',
    fontStyle: 'italic',
    fontSize: 13,
  },
  historyCard: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  historyDate: {
    color: '#F8FAFC',
    fontWeight: 'bold',
    fontSize: 13,
  },
  badgeText: {
    color: '#22C55E',
    fontSize: 10,
    fontWeight: '800',
    backgroundColor: '#14532D',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  historyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historySub: {
    color: '#94A3B8',
    fontSize: 11,
  },
});