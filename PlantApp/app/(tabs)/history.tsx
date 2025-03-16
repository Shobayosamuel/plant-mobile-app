import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslations } from '@/hooks/use-translations';
import { useAppStore } from '@/store/app-store';
import { ScanHistoryItem } from '@/components/ScanHistoryItem';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/Button';
import Colors from '@/constants/colors';
import { History, Trash2 } from 'lucide-react-native';

export default function HistoryScreen() {
  const { t } = useTranslations();
  const { scanHistory, clearScanHistory } = useAppStore();

  const handleClearHistory = () => {
    // Add confirmation dialog in a real app
    clearScanHistory();
  };

  if (scanHistory.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState
          icon={<History size={48} color={Colors.grey} />}
          title={t('history.empty')}
          action={
            <Button
              title="Scan a Plant"
              onPress={() => {}}
              variant="primary"
            />
          }
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={scanHistory}
        renderItem={({ item }) => <ScanHistoryItem scan={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{t('history.title')}</Text>
            <Button
              title={t('history.delete')}
              onPress={handleClearHistory}
              variant="outline"
              size="small"
              icon={<Trash2 size={16} color={Colors.error} />}
              textStyle={{ color: Colors.error }}
              style={{ borderColor: Colors.error }}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
});