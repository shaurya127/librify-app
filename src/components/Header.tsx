import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface HeaderProps {
  onMenuPress?: () => void;
  onAddUserPress?: () => void;
  onGridPress?: () => void;
  onAvatarPress?: () => void;
}

export default function Header({
  onMenuPress,
  onAddUserPress,
  onGridPress,
  onAvatarPress,
}: HeaderProps) {
  return (
    <View style={styles.header}>
      {/* Left: Hamburger Menu */}
      <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
        <Image
          source={require('@/assets/images/menu.png')}
          style={styles.iconImage}
        />
      </TouchableOpacity>

      {/* Center: Librify Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* Right: Action Icons */}
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.headerIcon} onPress={onAddUserPress}>
          <Image
            source={require('@/assets/images/profile.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon} onPress={onGridPress}>
          <Image
            source={require('@/assets/images/QR.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.userAvatar} onPress={onAvatarPress}>
          <Text style={styles.userAvatarText}>L</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 40,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    minHeight: 56,
  },
  menuButton: {
    padding: 6,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  logoImage: {
    height: 28,
    width: 120,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginHorizontal: 8,
  },
  iconImage: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#00A76F',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  userAvatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
