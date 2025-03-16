import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '@/store/app-store';
import { getDisease } from '@/mocks/diseases';
import { getPlant } from '@/mocks/plants';
import { Button } from '@/components/Button';
import Colors from '@/constants/colors';
import { Calendar, Trash2 } from 'lucide-react-native';

export default function ScanDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { scanHistory, deleteScanResult } = useAppStore();

  const scanResult = scanHistory.find(scan => scan.id === id);

  if (!scanResult) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Scan result not found</Text>
          <Button
            title="Go Back"
            onPress={() => router.back()}
            variant="primary"
            style={{ marginTop: 16 }}
          />
        </View>
      </SafeAreaView>
    );
  }

  const disease = getDisease(scanResult.diseaseId);
  const plant = getPlant(scanResult.plantId);

  if (!disease || !plant) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Disease or plant information not found</Text>
          <Button
            title="Go Back"
            onPress={() => router.back()}
            variant="primary"
            style={{ marginTop: 16 }}
          />
        </View>
      </SafeAreaView>
    );
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = () => {
    deleteScanResult(scanResult.id);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen options={{ title: 'Scan Details' }} />

      <ScrollView style={styles.scrollView}>
        <Image
          source={{ uri: scanResult.imageUri }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <View style={styles.dateContainer}>
              <Calendar size={16} color={Colors.textLight} />
              <Text style={styles.date}>{formatDate(scanResult.timestamp)}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.plantName}>{plant.name}</Text>
              <Text style={styles.diseaseName}>{disease.name}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Diagnosis</Text>
            <View style={styles.diagnosisContainer}>
              <Text style={styles.diagnosisLabel}>Confidence:</Text>
              <Text style={styles.diagnosisValue}>
                {Math.round(scanResult.confidence * 100)}%
              </Text>
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <Button
              title="View Disease Details"
              onPress={() => router.push(`/disease/${disease.id}`)}
              variant="primary"
              style={styles.actionButton}
            />

            <Button
              title="View Plant Information"
              onPress={() => router.push(`/plant/${plant.id}`)}
              variant="outline"
              style={styles.actionButton}
            />

            <Button
              title="Delete Scan"
              onPress={handleDelete}
              variant="text"
              icon={<Trash2 size={16} color={Colors.error} />}
              textStyle={{ color: Colors.error }}
              style={styles.deleteButton}
            />
          </View>
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
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: Colors.textLight,
    marginLeft: 6,
  },
  infoContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
  },
  plantName: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  diseaseName: {
    fontSize: 16,
    color: Colors.textLight,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  diagnosisContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  diagnosisLabel: {
    fontSize: 16,
    color: Colors.text,
  },
  diagnosisValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  actionsContainer: {
    marginTop: 8,
  },
  actionButton: {
    marginBottom: 12,
  },
  deleteButton: {
    marginTop: 8,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
  },
});