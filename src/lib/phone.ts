import { AUTH_CONFIG } from '@/constants/auth';

export const formatPhoneNumber = (text: string): string => {
  const cleaned = text.replace(/\D/g, '');
  if (cleaned.length >= 6) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
  }
  if (cleaned.length >= 3) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
  }
  return cleaned;
};

export const validatePhoneNumber = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === AUTH_CONFIG.PHONE_MIN_LENGTH;
};

export const formatPhoneForAPI = (phone: string, countryCode: string = AUTH_CONFIG.COUNTRY_CODE): string => {
  const cleaned = phone.replace(/\D/g, '');
  return `${countryCode}${cleaned}`;
};