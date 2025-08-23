import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface OnboardingFinalProps {
  onComplete: () => void;
}

export default function OnboardingFinalScreen({
  onComplete,
}: OnboardingFinalProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.finalCard}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>Li</Text>
            </View>
          </View>

          <View style={styles.headerSection}>
            <Text style={styles.title}>Your library dashboard is ready!</Text>
            <Text style={styles.status}>Please wait for approval!</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.tutorialSection}>
            <Text style={styles.tutorialText}>
              Watch tutorial video to get started.
            </Text>
            <View style={styles.videoContainer}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1607706189992-eae578626c86?w=400&h=250&fit=crop&crop=face',
                }}
                style={styles.videoThumbnail}
                resizeMode="cover"
              />
              <View style={styles.playButton}>
                <Ionicons name="play" size={24} color="#FFFFFF" />
              </View>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.emergencySection}>
            <Text style={styles.emergencyText}>
              Incase of emergency please contact admin.
            </Text>
            <View style={styles.emergencyButtons}>
              <TouchableOpacity style={styles.emergencyButton}>
                <Ionicons name="call" size={18} color={Colors.primary} />
                <Text style={styles.emergencyButtonText}>Call admin</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.emergencyButton}>
                <Ionicons name="mail" size={18} color={Colors.primary} />
                <Text style={styles.emergencyButtonText}>Mail admin</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  finalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    width: '100%',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 24,
  },
  logo: {
    width: 48,
    height: 48,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  status: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 24,
  },
  tutorialSection: {
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  tutorialText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
  },
  videoContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  videoThumbnail: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencySection: {
    alignItems: 'center',
    width: '100%',
  },
  emergencyText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
  },
  emergencyButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  emergencyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0F2FE',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  emergencyButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
  },
});
