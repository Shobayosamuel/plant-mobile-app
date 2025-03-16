import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { LANGUAGES, Language } from '@/constants/languages';
import { useAppStore } from '@/store/app-store';
import Colors from '@/constants/colors';
import { Check } from 'lucide-react-native';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useAppStore();

  const renderLanguageItem = ({ item }: { item: Language }) => {
    const isSelected = language === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.languageItem,
          isSelected && styles.selectedLanguageItem
        ]}
        onPress={() => setLanguage(item.id)}
      >
        <View style={styles.languageInfo}>
          <Text style={styles.languageFlag}>{item.flag}</Text>
          <View>
            <Text style={styles.languageName}>{item.name}</Text>
            {item.nativeName !== item.name && (
              <Text style={styles.nativeName}>{item.nativeName}</Text>
            )}
          </View>
        </View>

        {isSelected && (
          <Check size={20} color={Colors.primary} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={LANGUAGES}
      renderItem={renderLanguageItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedLanguageItem: {
    backgroundColor: Colors.lightGrey,
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  nativeName: {
    fontSize: 12,
    color: Colors.textLight,
  },
});