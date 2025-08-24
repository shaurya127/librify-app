import {
  QrCode,
  QrCodeIcon,
  UserPlus,
  MoreVertical,
} from 'lucide-react-native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface HeaderProps {
  onMenuPress?: () => void;
  onAddUserPress?: () => void;
  onGridPress?: () => void;
  onAvatarPress?: () => void;
  onMorePress?: () => void;
}

export default function Header({
  onMenuPress,
  onAddUserPress,
  onGridPress,
  onAvatarPress,
  onMorePress,
}: HeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.menuButton} onPress={onMorePress}>
        <Image
          source={require('@/assets/images/menu.png')}
          style={styles.iconImage}
        />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.headerIcon} onPress={onAddUserPress}>
          <UserPlus size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon} onPress={onGridPress}>
          <QrCodeIcon size={24} color="#000000" />
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
  headerIcon2: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 4,
    marginRight: 4,
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
