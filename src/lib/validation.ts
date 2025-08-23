import { AUTH_CONFIG } from '@/constants/auth';

export const validateOTP = (otp: string[]): boolean => {
  return otp.every(digit => digit !== '') && otp.join('').length === AUTH_CONFIG.OTP_LENGTH;
};

export const validateName = (name: string): boolean => {
  return name.trim().length > 0;
};

export const sanitizeName = (name: string): string => {
  return name.trim().replace(/\s+/g, ' ');
};