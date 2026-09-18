import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert, Linking, View, Modal } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export function CameraHandler({ photoCaptured, onPhotoCaptured }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const cameraRef = useRef(null);

  const handleOpenCamera = async () => {
    if (!permission) return;

    if (!permission.granted) {
      if (!permission.canAskAgain) {
        Alert.alert(
          "Acesso Negado à Câmera",
          "Para registrar fotos da vistoria no campo, ative o acesso à câmera nas configurações do sistema.",
          [
            { text: "Cancelar", style: "cancel" },
            { text: "Abrir Configurações", onPress: () => Linking.openSettings() }
          ]
        );
        return;
      } else {
        const res = await requestPermission();
        if (!res.granted) return;
      }
    }


    setIsCameraOpen(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) {
          setIsCameraOpen(false);
          onPhotoCaptured(true);
          Alert.alert("Foto Registrada", "A imagem foi capturada com sucesso.");
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível capturar a imagem.");
      }
    }
  };

  return (
    <>
      <TouchableOpacity 
        style={[styles.button, photoCaptured ? styles.buttonActive : styles.buttonStandard]} 
        onPress={handleOpenCamera}
      >
        <Text style={styles.buttonText}>
          {photoCaptured ? "✓ FOTO CAPTURADA (REFAZER)" : "📷 CAPTURAR FOTO"}
        </Text>
      </TouchableOpacity>

     
      <Modal visible={isCameraOpen} animationType="slide">
        <View style={styles.cameraContainer}>
          <CameraView style={styles.camera} ref={cameraRef}>
            <View style={styles.cameraOverlay}>
              <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
                <View style={styles.captureBtnInner} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.closeBtn} onPress={() => setIsCameraOpen(false)}>
                <Text style={styles.closeBtnText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonStandard: {
    backgroundColor: '#334155',
    borderColor: '#475569',
  },
  buttonActive: {
    backgroundColor: '#0F766E',
    borderColor: '#14B8A6',
  },
  buttonText: {
    color: '#F8FAFC',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  captureBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureBtnInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFF',
  },
  closeBtn: {
    marginTop: 20,
    padding: 10,
  },
  closeBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});