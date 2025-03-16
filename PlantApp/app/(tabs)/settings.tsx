import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslations } from '@/hooks/use-translations';
import { useAppStore } from '@/store/app-store';
import { SettingItem } from '@/components/SettingItem';
import Colors from '@/constants/colors';
import {
  Bell,
  Globe,
  HardDrive,
  Info,
  Languages,
  Moon,
  Sun,
  Wifi,
  WifiOff
} from 'lucide-react-native';
import { LANGUAGES } from '@/constants/languages';

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useTranslations();
  const {
    language,
    notificationsEnabled,
    toggleNotifications,
    offlineMode,
    toggleOfflineMode
  } = useAppStore();

  const currentLanguage = LANGUAGES.find(lang => lang.id === language);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.title')}</Text>

          <SettingItem
            icon={<Globe size={20} color={Colors.primary} />}
            title={t('settings.language')}
            subtitle={currentLanguage?.name || 'English'}
            onPress={() => router.push('/settings/language')}
          />

          <SettingItem
            icon={<Bell size={20} color={Colors.primary} />}
            title={t('settings.notifications')}
            subtitle="Receive reminders and alerts"
            toggle
            value={notificationsEnabled}
            onToggle={toggleNotifications}
          />

          <SettingItem
            icon={offlineMode ? <WifiOff size={20} color={Colors.primary} /> : <Wifi size={20} color={Colors.primary} />}
            title={t('settings.offline')}
            subtitle="Use app without internet connection"
            toggle
            value={offlineMode}
            onToggle={toggleOfflineMode}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Information</Text>

          <SettingItem
            icon={<Info size={20} color={Colors.primary} />}
            title={t('settings.about')}
            subtitle="Learn more about the app"
            onPress={() => router.push('/settings/about')}
          />

          <SettingItem
            icon={<HardDrive size={20} color={Colors.primary} />}
            title={t('settings.version')}
            subtitle="1.0.0"
          />
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
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
});