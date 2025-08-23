import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { PhoneInput } from '@/components/ui/PhoneInput';
import { Colors } from '@/constants/Colors';
import { useState, useRef, useEffect, useCallback } from 'react';
import { PhoneInputProps } from '@/types/auth';
import { AUTH_CONFIG } from '@/constants/auth';
import {
  formatPhoneNumber,
  validatePhoneNumber,
  formatPhoneForAPI,
} from '@/lib/phone';
import { useBackHandler } from '@/hooks/useBackHandler';

export default function PhoneInputScreen({
  onContinue,
  onBack,
}: PhoneInputProps) {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useBackHandler(onBack);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(timer);
  }, []);

  const handlePhoneChange = useCallback((text: string) => {
    setPhone(formatPhoneNumber(text));
  }, []);

  const handleContinue = useCallback(async () => {
    if (!validatePhoneNumber(phone)) return;
    Keyboard.dismiss();
    
    setIsLoading(true);
    try {
      await onContinue(formatPhoneForAPI(phone));
    } catch (error) {
      console.error('Error submitting phone:', error);
    } finally {
      setIsLoading(false);
    }
  }, [phone, onContinue]);

  const isValidPhone = validatePhoneNumber(phone);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Enter Phone Number</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          <Text style={styles.subtitle}>
            We'll send you a verification code
          </Text>

          <View style={styles.inputContainer}>
            <PhoneInput
              value={phone}
              onChangeText={handlePhoneChange}
              placeholder="Enter your phone number"
              countryCode={AUTH_CONFIG.COUNTRY_CODE}
              onSubmit={handleContinue}
              inputRef={inputRef}
            />
          </View>

          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={!isValidPhone}
            isLoading={isLoading}
            style={styles.button}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  subtitle: {
    fontSize: 16,
    color: '#6F6F6F',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 32,
  },
  button: {
    width: '100%',
  },
});
