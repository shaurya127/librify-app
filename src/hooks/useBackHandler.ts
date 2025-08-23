import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export const useBackHandler = (onBack: () => void, enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;
    
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack();
      return true;
    });
    
    return () => backHandler.remove();
  }, [onBack, enabled]);
};