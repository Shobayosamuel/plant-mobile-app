import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslations } from '@/hooks/use-translations';
import { PLANT_TIPS, PlantTip } from '@/mocks/tips';
import { TipCard } from '@/components/TipCard';
import Colors from '@/constants/colors';

type Category = 'all' | 'general' | 'watering' | 'fertilizing' | 'pest' | 'disease';

export default function TipsScreen() {
  const { t } = useTranslations();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const filteredTips = selectedCategory === 'all'
    ? PLANT_TIPS
    : PLANT_TIPS.filter(tip => tip.category === selectedCategory);

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Tips' },
    { id: 'general', label: 'General' },
    { id: 'watering', label: 'Watering' },
    { id: 'fertilizing', label: 'Fertilizing' },
    { id: 'pest', label: 'Pest Control' },
    { id: 'disease', label: 'Disease' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('tips.title')}</Text>
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item.id && styles.selectedCategoryButton
              ]}
              onPress={() => setSelectedCategory(item.id)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === item.id && styles.selectedCategoryButtonText
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
          keyExtractor={(item) => item.id}
        />
      </View>

      <FlatList
        data={filteredTips}
        renderItem={({ item }) => <TipCard tip={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.tipsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
  },
  categoriesContainer: {
    marginBottom: 8,
  },
  categoriesList: {
    paddingHorizontal: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: Colors.white,
  },
  selectedCategoryButton: {
    backgroundColor: Colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    color: Colors.text,
  },
  selectedCategoryButtonText: {
    color: Colors.white,
    fontWeight: '500',
  },
  tipsList: {
    paddingBottom: 16,
  },
});