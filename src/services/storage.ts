// Simple storage service without external dependencies
// For a production app, consider using expo-secure-store and @react-native-async-storage/async-storage

class StorageService {
  private memoryStore = new Map<string, any>();

  // Simple in-memory storage (for demo purposes)
  async setItem(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      this.memoryStore.set(key, jsonValue);
    } catch (error) {
      console.error('Error storing item:', error);
      throw error;
    }
  }

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = this.memoryStore.get(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error retrieving item:', error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      this.memoryStore.delete(key);
    } catch (error) {
      console.error('Error removing item:', error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      this.memoryStore.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  async getAllKeys(): Promise<readonly string[]> {
    try {
      return Array.from(this.memoryStore.keys());
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  }

  // Simple secure storage (for demo - in production use expo-secure-store)
  async setSecureItem(key: string, value: string): Promise<void> {
    return this.setItem(`secure_${key}`, value);
  }

  async getSecureItem(key: string): Promise<string | null> {
    return this.getItem<string>(`secure_${key}`);
  }

  async removeSecureItem(key: string): Promise<void> {
    return this.removeItem(`secure_${key}`);
  }
}

export const storage = new StorageService();
export default storage;
