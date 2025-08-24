import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
} from 'react-native';
import { Button } from '@/components/ui/Button';
import { PhoneInput } from '@/components/ui/PhoneInput';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { Colors } from '@/constants/Colors';
import { LoginProps } from '@/types/auth';
import { useAuthStore } from '@/store/auth-store';

export default function LoginScreen({ onContinueWithPhone }: LoginProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState('');
  const [systemError, setSystemError] = useState('');
  const { setCurrentPhone } = useAuthStore();

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setInputError('Please enter correct number');
      return;
    }

    setInputError('');
    setSystemError('');
    setIsLoading(true);

    try {
      // Store the phone number in the auth store
      setCurrentPhone(phoneNumber);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onContinueWithPhone();
    } catch (err) {
      setSystemError('Something went worng');
    } finally {
      setIsLoading(false);
    }
  };

  const dismissSystemError = () => {
    setSystemError('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Error Banner */}
      <ErrorBanner
        message={systemError}
        onDismiss={dismissSystemError}
        visible={!!systemError}
      />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Combined Header and Form Section with ImageBackground */}
        <ImageBackground
          source={require('@/assets/images/background.png')}
          style={styles.headerBackground}
          resizeMode="cover"
        >
          <View style={styles.headerSection}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={require('@/assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            {/* Welcome Text */}
            <Text style={styles.welcomeText}>Welcome Back 👋</Text>
          </View>

          {/* Phone Input and Button - now inside the ImageBackground */}
          <View style={styles.formSection}>
            <PhoneInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              countryCode="+91"
              error={inputError}
            />

            {/* Send OTP Button */}
            <Button
              title="Sent OTP"
              onPress={handleSendOTP}
              isLoading={isLoading}
              disabled={phoneNumber.length < 10}
              style={styles.button}
            />
          </View>
        </ImageBackground>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.secureContainer}>
            <Image
              source={require('@/assets/images/lockicon.png')}
              style={styles.lockIcon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.secureText}>Fast, secure and easy to use</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  headerBackground: {
    paddingTop: 180,
    paddingHorizontal: 24,
    paddingBottom: 32,
    position: 'relative',
  },
  headerSection: {
    alignItems: 'flex-start',
  },
  logoContainer: {
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  logo: {
    width: 120,
    height: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'left',
  },
  formSection: {
    marginTop: 20,
  },
  button: {
    marginTop: 16,
    width: '100%',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
    flex: 1,
    justifyContent: 'flex-end',
  },
  secureContainer: {
    marginBottom: 12,
  },
  lockIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.textSecondary,
  },
  secureText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
