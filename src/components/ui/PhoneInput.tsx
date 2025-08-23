import React, { forwardRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  KeyboardType,
  ReturnKeyType,
  TextInputProps,
} from 'react-native';
import { Colors } from '@/constants/Colors';

interface PhoneInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  countryCode: string;
  onSubmit?: () => void;
  inputRef?: React.RefObject<TextInput>;
  error?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChangeText,
  countryCode,
  onSubmit,
  inputRef,
  error,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Login with mobile number</Text>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <View style={styles.countryCodeContainer}>
          <Text style={styles.countryCode}>{countryCode}</Text>
        </View>
        <View style={styles.divider} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType="phone-pad"
          returnKeyType="done"
          onSubmitEditing={onSubmit}
          ref={inputRef}
          autoFocus
          maxLength={10}
          placeholder="Enter your mobile number"
          placeholderTextColor={Colors.placeholder}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 12,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: Colors.error,
    borderWidth: 2,
  },
  countryCodeContainer: {
    paddingRight: 12,
    minWidth: 40,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#E5E7EB',
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    height: '100%',
    fontWeight: '500',
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
    marginTop: 8,
    marginLeft: 4,
    fontWeight: '500',
  },
});
