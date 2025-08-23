export const AUTH_CONFIG = {
  COUNTRY_CODE: '+91',
  OTP_LENGTH: 6,
  PHONE_MIN_LENGTH: 10,
  RESEND_TIMER: 30,
  API_TIMEOUT: 10000,
} as const;

export const VALIDATION_MESSAGES = {
  PHONE_REQUIRED: 'Phone number is required',
  PHONE_INVALID: 'Please enter a valid phone number',
  OTP_REQUIRED: 'Verification code is required',
  OTP_INVALID: 'Please enter a valid 6-digit code',
  NAME_REQUIRED: 'First name is required',
} as const;

export const API_ENDPOINTS = {
  SEND_OTP: '/auth/send-otp',
  VERIFY_OTP: '/auth/verify-otp',
  REGISTER: '/auth/register',
} as const;