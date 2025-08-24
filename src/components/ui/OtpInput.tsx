import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardType,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '@/constants/Colors';

interface OtpInputProps {
  otp: string[];
  otpLength: number;
  phoneNumber: string;
  handleOtpChange: (value: string, index: number) => void;
  handleKeyPress: (e: any, index: number) => void;
  inputRefs: React.MutableRefObject<(TextInput | null)[]>;
  error?: string;
  onResend: () => void;
  resendTimer: number;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  otp,
  otpLength,
  phoneNumber,
  handleOtpChange,
  handleKeyPress,
  inputRefs,
  error,
  onResend,
  resendTimer,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Verify you mobile number</Text>
      <Text style={styles.subText}>
        We sent a code to {phoneNumber}
        <Text style={styles.editLink}> Edit</Text>
      </Text>

      <View style={styles.otpContainer}>
        {Array(otpLength)
          .fill(null)
          .map((_, index) => (
            <TextInput
              key={index}
              style={[
                styles.input,
                otp[index] ? styles.inputFilled : {},
                error && styles.inputError,
              ]}
              value={otp[index]}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              selectTextOnFocus
              testID={`otp-input-${index}`}
            />
          ))}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>
          Resent OTP {resendTimer > 0 ? resendTimer : ''}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  editLink: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  input: {
    width: 48,
    height: 56,
    borderRadius: 12,
    backgroundColor: Colors.background,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputFilled: {
    backgroundColor: Colors.background,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  resendContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  resendText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
