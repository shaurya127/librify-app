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

interface PersonalDetailsProps {
  onContinue: (data: {
    adminName: string;
    emailId: string;
    contactNumber: string;
    whatsappNumber: string;
  }) => void;
  onBack: () => void;
}

export default function PersonalDetailsScreen({
  onContinue,
  onBack,
}: PersonalDetailsProps) {
  const [adminName, setAdminName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [contactNumber, setContactNumber] = useState('+91-9910564550');
  const [whatsappNumber, setWhatsappNumber] = useState('+91-9910564550');
  const [sameAsContact, setSameAsContact] = useState(true);

  const handleContinue = () => {
    if (!adminName.trim() || !emailId.trim()) return;

    onContinue({
      adminName: adminName.trim(),
      emailId: emailId.trim(),
      contactNumber,
      whatsappNumber: sameAsContact ? contactNumber : whatsappNumber,
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
                <Ionicons
                  name="star"
                  size={8}
                  color="#FFFFFF"
                  style={styles.logoStar}
                />
              </View>
            </View>

            <Text style={styles.title}>Personal details</Text>
            <Text style={styles.subtitle}>Library admin personal details</Text>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.formContainer}>
            <TextInput
              label="Admin name"
              value={adminName}
              onChangeText={setAdminName}
              placeholder="Enter admin name"
            />

            <TextInput
              label="Email ID"
              value={emailId}
              onChangeText={setEmailId}
              placeholder="Enter admin email id"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              label="Contact number"
              value={contactNumber}
              onChangeText={setContactNumber}
              placeholder="Enter contact number"
              keyboardType="phone-pad"
              isReadOnly={true}
            />

            <TextInput
              label="WhatsApp number"
              value={whatsappNumber}
              onChangeText={handleWhatsappChange}
              placeholder="Enter WhatsApp number"
              keyboardType="phone-pad"
              isReadOnly={sameAsContact}
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
          </View>

          <View style={styles.pagination}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          <Button
            title="Next →"
            onPress={handleContinue}
            disabled={!adminName.trim() || !emailId.trim()}
            style={styles.button}
          />
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
    position: 'relative',
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
    backgroundColor: '#00A76F',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoStar: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#11181C',
    marginBottom: 6,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
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
    borderColor: '#00A76F',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#00A76F',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#11181C',
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
    backgroundColor: '#00A76F',
  },
  button: {
    marginBottom: 60,
    alignSelf: 'flex-end',
    width: 200,
  },
});
