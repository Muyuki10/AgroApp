import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function GpsIndicator({ accuracy, error }) {
  const getGpsStatus = () => {
    if (error || accuracy === null) {
      return { label: 'SEM SINAL', color: '#64748B', detail: 'Desativado' };
    }
    if (accuracy < 10) {
      return { label: 'ALTA', color: '#22C55E', detail: `${accuracy.toFixed(1)}m` };
    }
    if (accuracy <= 30) {
      return { label: 'MÉDIA', color: '#EAB308', detail: `${accuracy.toFixed(1)}m` };
    }
    return { label: 'BAIXA', color: '#EF4444', detail: `${accuracy.toFixed(1)}m` };
  };

  const status = getGpsStatus();

  return (
    <View style={styles.sensorTile}>
      <Text style={styles.tileLabel}>Precisão GPS</Text>
      <View style={styles.badgeRow}>
        <View style={[styles.dot, { backgroundColor: status.color }]} />
        <Text style={[styles.tileValue, { color: status.color }]}>{status.label}</Text>
      </View>
      <Text style={styles.tileDetail}>{status.detail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sensorTile: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  tileLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  tileValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  tileDetail: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 2,
  },
});