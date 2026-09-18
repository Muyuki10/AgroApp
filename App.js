import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  useWindowDimensions,
  SafeAreaView,
  StatusBar
  
} from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAccelerometer } from './src/hooks/useAccelerometer';
import { GpsIndicator } from './src/components/GpsIndicator';
import { CameraHandler } from './src/components/CameraHandler';
import { HistoryList } from './src/components/HistoryList';

export default function App() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const { maxG, resetG } = useAccelerometer();
  const [photoCaptured, setPhotoCaptured] = useState(false);
  const [gpsAccuracy, setGpsAccuracy] = useState(null);
  const [gpsError, setGpsError] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setGpsError(true);
          return;
        }
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setGpsAccuracy(location.coords.accuracy);
      } catch (error) {
        setGpsError(true);
      }
    })();

    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await AsyncStorage.getItem('@visitas_agricolas');
      if (data) setHistory(JSON.parse(data));
    } catch (e) {
      console.error("Erro ao carregar histórico", e);
    }
  };

  const handleFinalizeAudit = async () => {
    if (maxG > 2.0) {
      Alert.alert(
        "⚠️ Instabilidade Física Detectada",
        `Envio bloqueado! Movimentação brusca ou queda detectada (${maxG.toFixed(2)}g). Estabilize o dispositivo antes de prosseguir.`,
        [{ text: "Resetar Sensores", onPress: resetG }]
      );
      return;
    }

    if (!photoCaptured) {
      Alert.alert("Atenção", "É obrigatório capturar uma foto antes de finalizar a auditoria.");
      return;
    }

    const newRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      accuracy: gpsAccuracy ? `${gpsAccuracy.toFixed(1)}m` : "Sem Sinal",
      maxG: maxG.toFixed(2)
    };

    try {
      const updatedHistory = [newRecord, ...history];
      await AsyncStorage.setItem('@visitas_agricolas', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
      setPhotoCaptured(false);
      resetG();
      Alert.alert("Sucesso", "Auditoria gravada com sucesso!");
    } catch (e) {
      Alert.alert("Erro", "Falha ao salvar a auditoria no armazenamento local.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
    
      <View style={styles.header}>
        <Text style={styles.headerTag}>AGRO INSPECT</Text>
        <Text style={styles.headerTitle}>Painel de Visita Técnica</Text>
      </View>

      <ScrollView contentContainerStyle={[styles.content, isLandscape && styles.contentLandscape]}>
        
      
        <View style={styles.mainCard}>
          <Text style={styles.cardHeader}>Painel de Auditoria</Text>

       
          <View style={styles.sensorsGrid}>
            <GpsIndicator accuracy={gpsAccuracy} error={gpsError} />

            <View style={styles.sensorTile}>
              <Text style={styles.tileLabel}>Sensor G (Pico)</Text>
              <Text style={[styles.tileValue, maxG > 2.0 ? styles.gDanger : styles.gSafe]}>
                {maxG.toFixed(2)}g
              </Text>
            </View>
          </View>

       
          <View style={styles.actionContainer}>
            <CameraHandler 
              photoCaptured={photoCaptured} 
              onPhotoCaptured={setPhotoCaptured} 
            />

            <TouchableOpacity 
              style={[styles.primaryButton, maxG > 2.0 && styles.buttonDisabled]} 
              onPress={handleFinalizeAudit}
            >
              <Text style={styles.primaryButtonText}>FINALIZAR AUDITORIA</Text>
            </TouchableOpacity>
          </View>
        </View>

      
        <View style={styles.historyCardContainer}>
          <HistoryList history={history} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  headerTag: {
    color: '#22C55E',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  headerTitle: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  contentLandscape: {
    flexDirection: 'row',
  },
  mainCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  historyCardContainer: {
    flex: 1,
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  sensorsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  sensorTile: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    justifyContent: 'center',
  },
  tileLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  tileValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  gSafe: { color: '#22C55E' },
  gDanger: { color: '#EF4444' },
  actionContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#22C55E',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#22C55E',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#64748B',
    shadowOpacity: 0,
  },
  primaryButtonText: {
    color: '#0F172A',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 1,
  },
});