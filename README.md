# 📚 Librify App

A modern, secure mobile application for library management and book services, built with Expo/React Native.

## ✨ Features

### Core Technologies
- **⚡ Expo SDK 52** - Latest Expo features and optimizations
- **📱 Expo Router** - File-based routing system
- **🔷 TypeScript** - Type-safe development
- **🎨 Theming System** - Light/dark mode support

### Authentication & Security
- **🔐 Phone Number Authentication** - Secure OTP-based login
- **🔒 Secure Storage** - Encrypted storage for sensitive data
- **📱 Mobile-First Design** - Optimized for mobile devices
- **🛡️ Input Validation** - Robust error handling and validation

### UI & Components
- **🧱 Modern UI Components** - Clean, professional design
- **🎯 Custom Hooks** - Theme, color scheme utilities
- **📐 Responsive Design** - Works on phones, tablets, and web
- **♿ Accessibility** - Built-in accessibility support

### Development & Testing
- **🧪 Jest Testing** - Pre-configured testing environment
- **📋 ESLint & Prettier** - Code formatting and linting
- **🔧 TypeScript Config** - Optimized TypeScript setup
- **📱 Expo Dev Client** - Enhanced development experience

## 🛠 Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Expo CLI (`npm install -g @expo/cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd librify-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   npm run ios     # iOS simulator
   npm run android # Android emulator
   npm run web     # Web browser
   ```

## 📚 Project Structure

```
├── app/                    # App screens (Expo Router)
│   ├── (tabs)/            # Tab navigation screens
│   ├── _layout.tsx        # Root layout
│   ├── _LoginScreen.tsx   # Main login screen
│   ├── otp.tsx            # OTP verification screen
│   └── +not-found.tsx     # 404 page
├── assets/                 # Images, fonts, etc.
├── components/            # Reusable UI components
│   ├── ui/               # Platform-specific components
│   │   ├── Button.tsx    # Custom button component
│   │   ├── PhoneInput.tsx # Phone number input
│   │   ├── OtpInput.tsx  # OTP input component
│   │   └── ErrorBanner.tsx # Error display component
│   └── __tests__/        # Component tests
├── constants/             # App constants (colors, etc.)
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── services/             # API services and external integrations
├── store/                # State management (Zustand stores)
├── types/                # TypeScript type definitions
└── scripts/              # Build and deployment scripts
```

## 🧩 Key Components

### Authentication Flow
```typescript
// Phone number input with validation
<PhoneInput
  value={phoneNumber}
  onChangeText={setPhoneNumber}
  countryCode="+91"
  error={error}
/>

// OTP verification
<OtpInput
  otp={otp}
  otpLength={6}
  handleOtpChange={handleOtpChange}
  handleKeyPress={handleKeyPress}
  inputRefs={inputRefs}
  error={error}
/>
```

### Custom Components
```typescript
import { Button, PhoneInput, OtpInput, ErrorBanner } from '@/components/ui';

<Button 
  title="Send OTP" 
  onPress={handleSendOTP}
  isLoading={isLoading}
  variant="primary"
/>

<ErrorBanner
  message="Something went wrong"
  onDismiss={dismissError}
  visible={showError}
/>
```

## 🎨 Design System

The app features a modern, clean design with:

- **Primary Color**: Green (#22C55E) - Represents growth and knowledge
- **Clean Typography**: Modern font weights and sizes
- **Subtle Patterns**: Light background patterns for visual interest
- **Consistent Spacing**: 8px grid system for consistent layouts
- **Professional UI**: Clean borders, shadows, and modern components

### Color Palette
```typescript
export const Colors = {
  primary: '#22C55E',        // Main green
  primaryLight: '#4ADE80',   // Light green
  primaryDark: '#16A34A',    // Dark green
  background: '#FFFFFF',      // White background
  backgroundPattern: '#F8F9FA', // Light grey pattern
  text: '#000000',           // Black text
  textSecondary: '#666666',  // Secondary text
  error: '#EF4444',          // Error red
  border: '#E5E7EB',         // Light borders
};
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in CI mode
npm run test:ci

# Run with coverage
npm test -- --coverage
```

## 📱 Building for Production

### EAS Build (Recommended)
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for iOS
npm run build:ios

# Build for Android  
npm run build:android
```

### Local Builds
```bash
# Generate native code
npm run prebuild

# Build locally (requires Xcode/Android Studio)
npx expo run:ios
npx expo run:android
```

## 🔧 Configuration

### App Configuration
Update `app.json` for your app:

```json
{
  "expo": {
    "name": "Librify",
    "slug": "librify",
    "bundleIdentifier": "com.yourcompany.librify",
    "package": "com.librify.app"
  }
}
```

## 📖 Scripts

- `npm start` - Start development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run on web browser
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript checks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 [Expo Documentation](https://docs.expo.dev/)
- 💬 [Expo Discord](https://chat.expo.dev/)
- 🐛 [Issues](../../issues)

---

Built with ❤️ for modern library management using Expo and React Native
