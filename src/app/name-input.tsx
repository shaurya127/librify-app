import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, TextInput } from '@/components/ui';
import { Colors } from '@/constants/Colors';
import { useState, useCallback } from 'react';
import { NameInputProps } from '@/types/auth';
import { useBackHandler } from '@/hooks/useBackHandler';

const validateName = (name: string) => {
  return name.trim().length >= 2;
};

const sanitizeName = (name: string) => {
  return name.trim();
};

export default function NameInputScreen({
  onContinue,
  onBack,
}: NameInputProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useBackHandler(onBack, true);

  const handleContinue = useCallback(async () => {
    if (!validateName(firstName)) return;
    Keyboard.dismiss();

    setIsLoading(true);
    try {
      await onContinue(sanitizeName(firstName), sanitizeName(lastName));
    } catch (error) {
      console.error('Error submitting name:', error);
    } finally {
      setIsLoading(false);
    }
  }, [firstName, lastName, onContinue]);

  const isValidFirstName = validateName(firstName);

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
          <Text style={styles.headerTitle}>Your Name</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>What's your name?</Text>

          <View style={styles.inputContainer}>
            <TextInput
              label="First Name *"
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter your first name"
              autoFocus
              returnKeyType="next"
            />

            <TextInput
              label="Last Name (optional)"
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter your last name"
              returnKeyType="done"
              onSubmitEditing={handleContinue}
            />
          </View>

          <View style={styles.bottom}>
            <Button
              title="Continue"
              onPress={handleContinue}
              disabled={!isValidFirstName}
              isLoading={isLoading}
              style={styles.continueBtn}
            />
          </View>
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 32,
  },
  bottom: {
    marginTop: 'auto',
  },
  continueBtn: {
    width: '100%',
  },
});
