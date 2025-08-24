import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { OtpInput } from '@/components/ui/OtpInput';
import { Colors } from '@/constants/Colors';
import { useAuthStore } from '@/store/auth-store';
import { OtpInputProps } from '@/types/auth';
import { AUTH_CONFIG } from '@/constants/auth';
import { useBackHandler } from '@/hooks/useBackHandler';
import { useOTPInput } from '@/hooks/useOTPInput';

export default function OtpScreen({ onVerify, onBack }: OtpInputProps) {
  const [resendTimer, setResendTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentPhone } = useAuthStore();
  const {
    otp,
    inputRefs,
    handleOtpChange,
    handleKeyPress,
    focusInput,
    autoFillOtp,
    isComplete,
  } = useOTPInput(onVerify);

  useBackHandler(onBack);

  useEffect(() => {
    const timer = setTimeout(() => focusInput(0), 300);
    return () => clearTimeout(timer);
  }, [focusInput]);

  useEffect(() => {
    if (resendTimer <= 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleResend = useCallback(() => {
    if (resendTimer > 0) return;
    setResendTimer(30);
    setError('');
  }, [resendTimer]);

  const handleConfirm = useCallback(async () => {
    if (!isComplete || isLoading) return;

    setIsLoading(true);
    setError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await onVerify(otp.join(''));
    } catch (error) {
      setError('Please enter correct OTP');
    } finally {
      setIsLoading(false);
    }
  }, [isComplete, isLoading, otp, onVerify]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.patternBackground} />

        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Image
                source={require('@/assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.welcomeText}>Welcome Back 👋</Text>
          </View>

          <View style={styles.otpSection}>
            <OtpInput
              otp={otp}
              otpLength={AUTH_CONFIG.OTP_LENGTH}
              phoneNumber={currentPhone}
              handleOtpChange={handleOtpChange}
              handleKeyPress={handleKeyPress}
              inputRefs={inputRefs}
              error={error}
            />
          </View>

          <Button
            title="Verify OTP"
            onPress={handleConfirm}
            disabled={!isComplete}
            isLoading={isLoading}
            style={styles.button}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.secureContainer}>
            <Image
              source={require('@/assets/images/lockicon.png')}
              style={styles.lockIcon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.secureText}>Fast, secure and easy to use</Text>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  patternBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: Colors.backgroundPattern,
    opacity: 0.3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 20,
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  logoSection: {
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 120,
    height: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'left',
  },
  otpSection: {
    marginBottom: 24,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  resendText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  resendLink: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  button: {
    marginBottom: 40,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  secureContainer: {
    marginBottom: 12,
  },
  lockIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.textSecondary,
  },
  secureText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  testButton: {
    backgroundColor: Colors.primaryLight,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  testButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
});
