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

interface LibraryFacilitiesProps {
  onContinue: (data: {
    facilities: string[];
    bufferDays: string;
    floors: Array<{ name: string; seats: string }>;
  }) => void;
  onBack: () => void;
}

const FACILITY_OPTIONS = [
  'Select all',
  'Wifi',
  'AC',
  'Parking',
  'Water',
  'Printer',
  'Locker',
  'Book',
  'Chai/Coffee',
];

export default function LibraryFacilitiesScreen({
  onContinue,
  onBack,
}: LibraryFacilitiesProps) {
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [bufferDays, setBufferDays] = useState('');
  const [floors, setFloors] = useState([{ name: 'Floor-A', seats: '' }]);

  const handleFacilityToggle = (facility: string) => {
    if (facility === 'Select all') {
      if (selectedFacilities.length === FACILITY_OPTIONS.length - 1) {
        setSelectedFacilities([]);
      } else {
        setSelectedFacilities(
          FACILITY_OPTIONS.filter((f) => f !== 'Select all')
        );
      }
    } else {
      if (selectedFacilities.includes(facility)) {
        setSelectedFacilities(selectedFacilities.filter((f) => f !== facility));
      } else {
        setSelectedFacilities([...selectedFacilities, facility]);
      }
    }
  };

  const addFloor = () => {
    const floorNumber = floors.length + 1;
    setFloors([
      ...floors,
      { name: `Floor-${String.fromCharCode(64 + floorNumber)}`, seats: '' },
    ]);
  };

  const removeFloor = (index: number) => {
    if (floors.length > 1) {
      setFloors(floors.filter((_, i) => i !== index));
    }
  };

  const updateFloorSeats = (index: number, seats: string) => {
    const newFloors = [...floors];
    newFloors[index].seats = seats;
    setFloors(newFloors);
  };

  const handleContinue = () => {
    const hasValidFloors = floors.some((floor) => floor.seats.trim() !== '');
    if (!hasValidFloors) return;

    onContinue({
      facilities: selectedFacilities,
      bufferDays,
      floors: floors.filter((floor) => floor.seats.trim() !== ''),
    });
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

            <Text style={styles.title}>Library facilities</Text>
            <Text style={styles.subtitle}>Facilities & floor details</Text>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.formContainer}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Select library facilities (Optional)
              </Text>
              <View style={styles.facilitiesGrid}>
                {FACILITY_OPTIONS.map((facility) => (
                  <TouchableOpacity
                    key={facility}
                    style={[
                      styles.facilityButton,
                      selectedFacilities.includes(facility) &&
                        styles.facilityButtonSelected,
                    ]}
                    onPress={() => handleFacilityToggle(facility)}
                  >
                    <Text
                      style={[
                        styles.facilityButtonText,
                        selectedFacilities.includes(facility) &&
                          styles.facilityButtonTextSelected,
                      ]}
                    >
                      {facility}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.addFacilityButton}>
                  <Text style={styles.addFacilityText}>+ Add facility</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Add library buffer days (Optional)
              </Text>
              <TextInput
                label="Buffer days"
                value={bufferDays}
                onChangeText={setBufferDays}
                placeholder="Enter days"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Floor details</Text>
              {floors.map((floor, index) => (
                <View key={index} style={styles.floorContainer}>
                  <View style={styles.floorHeader}>
                    <Text style={styles.floorName}>{floor.name}</Text>
                    {floors.length > 1 && (
                      <TouchableOpacity onPress={() => removeFloor(index)}>
                        <Ionicons name="trash" size={20} color="#EF4444" />
                      </TouchableOpacity>
                    )}
                  </View>
                  <TextInput
                    label="Total seats"
                    value={floor.seats}
                    onChangeText={(seats) => updateFloorSeats(index, seats)}
                    placeholder="Enter total seat number"
                    keyboardType="numeric"
                  />
                </View>
              ))}
              <TouchableOpacity
                style={styles.addFloorButton}
                onPress={addFloor}
              >
                <Text style={styles.addFloorText}>+ Add floor</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.pagination}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={[styles.dot, styles.dotActive]} />
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
              disabled={!floors.some((floor) => floor.seats.trim() !== '')}
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  facilityButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: Colors.background,
    minWidth: 80,
    alignItems: 'center',
  },
  facilityButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  facilityButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  facilityButtonTextSelected: {
    color: '#FFFFFF',
  },
  addFacilityButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 12,
    backgroundColor: Colors.background,
    minWidth: 100,
    alignItems: 'center',
  },
  addFacilityText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.background,
  },
  floorContainer: {
    marginBottom: 16,
  },
  floorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  floorName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  addFloorButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  addFloorText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
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
