export type AuthStep =
  | 'login'
  | 'otp'
  | 'personal-details'
  | 'library-basic'
  | 'library-facilities'
  | 'library-shifts'
  | 'onboarding-success'
  | 'onboarding-final';

export interface PhoneInputProps {
  onContinue: (phone: string) => void;
  onBack: () => void;
}

export interface OtpInputProps {
  onVerify: (otp: string) => void;
  onBack: () => void;
  phoneNumber: string; // Add phone number property
}

export interface NameInputProps {
  onContinue: (firstName: string, lastName: string) => void;
  onBack: () => void;
}

export interface LoginProps {
  onContinueWithPhone: () => void;
}

export interface AuthFlowState {
  step: AuthStep;
  isTransitioning: boolean;
}
