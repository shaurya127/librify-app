import React from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Colors } from '@/constants/Colors';

interface CustomTextInputProps extends TextInputProps {
  label: string;
  error?: string;
  isReadOnly?: boolean;
}

export const TextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  isReadOnly = false,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <RNTextInput
        style={[
          styles.input,
          isReadOnly && styles.readOnlyInput,
          error && styles.errorInput,
          style,
        ]}
        editable={!isReadOnly}
        placeholderTextColor={Colors.placeholder}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#11181C',
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#11181C',
    backgroundColor: '#FCFCFC',
  },
  readOnlyInput: {
    backgroundColor: '#F3F4F6',
    color: '#374151',
  },
  errorInput: {
    borderColor: Colors.error,
  },
  errorText: {
    fontSize: 14,
    color: Colors.error,
    marginTop: 4,
  },
});
