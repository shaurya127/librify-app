import { openBrowserAsync } from 'expo-web-browser';
import { Text, Pressable } from 'react-native';

type Props = {
  href: string;
  children: React.ReactNode;
};

export function ExternalLink({ href, children }: Props) {
  return (
    <Pressable
      onPress={() => {
        openBrowserAsync(href);
      }}
    >
      <Text style={{ color: 'blue' }}>{children}</Text>
    </Pressable>
  );
}
