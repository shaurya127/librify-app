import { useState, useRef, useCallback } from 'react';
import { TextInput, Keyboard } from 'react-native';
import { AUTH_CONFIG } from '@/constants/auth';
import { validateOTP } from '@/lib/validation';

export const useOTPInput = (onComplete: (otp: string) => void) => {
  const [otp, setOtp] = useState<string[]>(
    Array(AUTH_CONFIG.OTP_LENGTH).fill('')
  );
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleOtpChange = useCallback(
    (value: string, index: number) => {
      if (value.length > 1) return;

      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < AUTH_CONFIG.OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      if (validateOTP(newOtp)) {
        Keyboard.dismiss();
        setTimeout(() => onComplete(newOtp.join('')), 100);
      }
    },
    [otp, onComplete]
  );

  const handleKeyPress = useCallback(
    (key: string, index: number) => {
      if (key === 'Backspace' && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp]
  );

  const focusInput = useCallback((index: number) => {
    inputRefs.current[index]?.focus();
  }, []);

  const autoFillOtp = useCallback((testOtp: string) => {
    if (testOtp.length === AUTH_CONFIG.OTP_LENGTH) {
      const otpArray = testOtp.split('');
      setOtp(otpArray);
      setTimeout(() => {
        const lastFilledIndex = otpArray.findIndex((digit) => digit === '');
        const focusIndex =
          lastFilledIndex === -1 ? AUTH_CONFIG.OTP_LENGTH - 1 : lastFilledIndex;
        inputRefs.current[focusIndex]?.focus();
      }, 100);
    }
  }, []);

  return {
    otp,
    inputRefs,
    handleOtpChange,
    handleKeyPress,
    focusInput,
    autoFillOtp,
    isComplete: validateOTP(otp),
  };
};
