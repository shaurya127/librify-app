import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, TextInput } from '@/components/ui';
import { Colors } from '@/constants/Colors';

interface LibraryBasicProps {
  onContinue: (data: {
    libraryName: string;
    emailId: string;
    contactNumber: string;
    whatsappNumber: string;
    address: string;
    pinCode: string;
    district: string;
    state: string;
  }) => void;
  onBack: () => void;
}

export default function LibraryBasicScreen({
  onContinue,
  onBack,
}: LibraryBasicProps) {
  const [libraryName, setLibraryName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [address, setAddress] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [sameAsContact, setSameAsContact] = useState(true);

  const handleContinue = () => {
    if (
      !libraryName.trim() ||
      !emailId.trim() ||
      !contactNumber.trim() ||
      !address.trim() ||
      !pinCode.trim() ||
      !district.trim() ||
      !state.trim()
    )
      return;

    onContinue({
      libraryName: libraryName.trim(),
      emailId: emailId.trim(),
      contactNumber,
      whatsappNumber: sameAsContact ? contactNumber : whatsappNumber,
      address: address.trim(),
      pinCode: pinCode.trim(),
      district: district.trim(),
      state: state.trim(),
    });
  };

  const handleWhatsappChange = (value: string) => {
    setWhatsappNumber(value);
    if (value === contactNumber) {
      setSameAsContact(true);
    } else {
      setSameAsContact(false);
    }
  };

  const toggleSameAsContact = () => {
    if (sameAsContact) {
      setSameAsContact(false);
    } else {
      setWhatsappNumber(contactNumber);
      setSameAsContact(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require('@/assets/images/background.png')}
          style={styles.headerBackground}
          resizeMode="cover"
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>Li</Text>
                <Ionicons name="arrow-up" size={12} color="#FFFFFF" />
              </View>
            </View>

            <Text style={styles.title}>Library basic details</Text>
            <Text style={styles.subtitle}>
              Add library contact details & address
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.formContainer}>
            <TextInput
              label="Library name"
              value={libraryName}
              onChangeText={setLibraryName}
              placeholder="Enter library name"
            />

            <TextInput
              label="Email ID"
              value={emailId}
              onChangeText={setEmailId}
              placeholder="Enter library email id"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              label="Contact number"
              value={contactNumber}
              onChangeText={setContactNumber}
              placeholder="Enter library contact number"
              keyboardType="phone-pad"
            />

            <TextInput
              label="WhatsApp number"
              value={whatsappNumber}
              onChangeText={handleWhatsappChange}
              placeholder="Enter library whatsApp number"
              keyboardType="phone-pad"
            />

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={toggleSameAsContact}
            >
              <View
                style={[
                  styles.checkbox,
                  sameAsContact && styles.checkboxChecked,
                ]}
              >
                {sameAsContact && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Same as contact no.</Text>
            </TouchableOpacity>

            <TextInput
              label="Address"
              value={address}
              onChangeText={setAddress}
              placeholder="Enter library complete address"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />

            <TextInput
              label="Pin code"
              value={pinCode}
              onChangeText={setPinCode}
              placeholder="Enter library location pin code"
              keyboardType="numeric"
              maxLength={6}
            />

            <TextInput
              label="District"
              value={district}
              onChangeText={setDistrict}
              placeholder="Enter library location district"
            />

            <TextInput
              label="State"
              value={state}
              onChangeText={setState}
              placeholder="Enter library location state"
            />
          </View>

          <View style={styles.pagination}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Ionicons
                name="arrow-back"
                size={20}
                color={Colors.textSecondary}
              />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <Button
              title="Next →"
              onPress={handleContinue}
              disabled={
                !libraryName.trim() ||
                !emailId.trim() ||
                !contactNumber.trim() ||
                !address.trim() ||
                !pinCode.trim() ||
                !district.trim() ||
                !state.trim()
              }
              style={styles.nextButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  headerBackground: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'flex-start',
  },
  logoContainer: {
    marginBottom: 16,
  },
  logo: {
    width: 48,
    height: 48,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 6,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'left',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  formContainer: {
    marginBottom: 40,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
  },
  checkboxLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 8,
  },
  dot: {
    width: 24,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
  },
  dotActive: {
    backgroundColor: Colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 60,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: Colors.background,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  nextButton: {
    width: 200,
  },
});
