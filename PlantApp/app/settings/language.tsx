import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useTranslations } from '@/hooks/use-translations';
import { LanguageSelector } from '@/components/LanguageSelector';
import Colors from '@/constants/colors';

export default function LanguageScreen() {
  const { t } = useTranslations();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen options={{ title: t('settings.language') }} />

      <LanguageSelector />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});