import React from 'react';
import { Image } from 'react-native';

interface LockIconProps {
  size?: number;
}

export const LockIcon: React.FC<LockIconProps> = ({ size = 48 }) => (
  <Image
    source={require('../../../assets/images/lockicon.png')}
    style={{ width: size, height: size }}
    resizeMode="contain"
  />
);