import { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

export function useAccelerometer() {
  const [maxG, setMaxG] = useState(0);

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);
    const subscription = Accelerometer.addListener(data => {
      // Cálculo da aceleração vetorial agregada: sqrt(x^2 + y^2 + z^2)
      const gForce = Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2);
      setMaxG(prevMax => Math.max(prevMax, gForce));
    });

    return () => subscription && subscription.remove();
  }, []);

  const resetG = () => setMaxG(0);

  return { maxG, resetG };
}