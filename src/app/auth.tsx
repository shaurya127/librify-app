import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore, User } from '@/store/auth-store';
import { AuthStep } from '@/types/auth';
import LoginScreen from './_LoginScreen';
import OtpScreen from './otp';
import PersonalDetailsScreen from './personal-details';
import LibraryBasicScreen from './library-basic';
import LibraryFacilitiesScreen from './library-facilities';
import LibraryShiftsScreen from './library-shifts';
import OnboardingSuccessScreen from './onboarding-success';
import OnboardingFinalScreen from './onboarding-final';

export default function AuthFlow() {
  const [step, setStep] = useState<AuthStep>('login');
  const { setCurrentPhone, login, setLoading, setError, isAuthenticated } =
    useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  const handleContinueWithPhone = useCallback(() => {
    const currentPhone = useAuthStore.getState().currentPhone;
    if (currentPhone) {
      setStep('otp');
    }
  }, []);

  const handleBackToLogin = useCallback(() => setStep('login'), []);
  const handleBackToPersonalDetails = useCallback(
    () => setStep('personal-details'),
    []
  );
  const handleBackToLibraryBasic = useCallback(
    () => setStep('library-basic'),
    []
  );
  const handleBackToLibraryFacilities = useCallback(
    () => setStep('library-facilities'),
    []
  );
  const handleBackToLibraryShifts = useCallback(
    () => setStep('library-shifts'),
    []
  );

  const handleOtpVerify = useCallback(
    async (otp: string) => {
      setLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setStep('personal-details');
      } catch (error) {
        setError('Invalid verification code. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError]
  );

  const handlePersonalDetailsSubmit = useCallback(async (data: any) => {
    setStep('library-basic');
  }, []);

  const handleLibraryBasicSubmit = useCallback(async (data: any) => {
    setStep('library-facilities');
  }, []);

  const handleLibraryFacilitiesSubmit = useCallback(async (data: any) => {
    setStep('library-shifts');
  }, []);

  const handleLibraryShiftsSubmit = useCallback(async (data: any) => {
    setStep('onboarding-success');
  }, []);

  const handleOnboardingSuccess = useCallback(() => {
    setStep('onboarding-final');
  }, []);

  const handleOnboardingComplete = useCallback(() => {
    const user: User = {
      id: Date.now().toString(),
      phone: useAuthStore.getState().currentPhone,
      firstName: 'Admin',
      lastName: 'User',
    };
    login(user);
    router.replace('/(tabs)');
  }, [login]);

  return (
    <View style={styles.container}>
      {step === 'login' && (
        <LoginScreen onContinueWithPhone={handleContinueWithPhone} />
      )}
      {step === 'otp' && (
        <OtpScreen onVerify={handleOtpVerify} onBack={handleBackToLogin} />
      )}
      {step === 'personal-details' && (
        <PersonalDetailsScreen
          onContinue={handlePersonalDetailsSubmit}
          onBack={handleBackToLogin}
        />
      )}
      {step === 'library-basic' && (
        <LibraryBasicScreen
          onContinue={handleLibraryBasicSubmit}
          onBack={handleBackToPersonalDetails}
        />
      )}
      {step === 'library-facilities' && (
        <LibraryFacilitiesScreen
          onContinue={handleLibraryFacilitiesSubmit}
          onBack={handleBackToLibraryBasic}
        />
      )}
      {step === 'library-shifts' && (
        <LibraryShiftsScreen
          onContinue={handleLibraryShiftsSubmit}
          onBack={handleBackToLibraryFacilities}
        />
      )}
      {step === 'onboarding-success' && (
        <OnboardingSuccessScreen onContinue={handleOnboardingSuccess} />
      )}
      {step === 'onboarding-final' && (
        <OnboardingFinalScreen onComplete={handleOnboardingComplete} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
