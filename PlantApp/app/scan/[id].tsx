import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslations } from '@/hooks/use-translations';
import { useAppStore } from '@/store/app-store';
import { getDisease } from '@/mocks/diseases';
import { getPlant } from '@/mocks/plants';
import { DiseaseCard } from '@/components/DiseaseCard';
import { Button } from '@/components/Button';
import Colors from '@/constants/colors';
import { AlertTriangle, ArrowRight, Check, X } from 'lucide-react-native';

export default function ScanResultScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslations();
  const scanHistory = useAppStore(state => state.scanHistory);

  // Find the scan result by ID
  const scanResult = scanHistory.find(scan => scan.id === id);

  if (!scanResult) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{t('scan.notFound')}</Text>
          <Button
            title={t('common.goBack')}
            onPress={() => router.back()}
            variant="primary"
          />
        </View>
      </SafeAreaView>
    );
  }

  // Get disease and plant information
  const disease = getDisease(scanResult.diseaseId);
  const plant = getPlant(scanResult.plantId);

  if (!disease || !plant) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{t('scan.infoNotFound')}</Text>
          <Button
            title={t('common.goBack')}
            onPress={() => router.back()}
            variant="primary"
          />
        </View>
      </SafeAreaView>
    );
  }

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 0.7) return Colors.success;
    if (confidence >= 0.4) return Colors.warning;
    return Colors.error;
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.7) return <Check size={20} color={Colors.success} />;
    if (confidence >= 0.4) return <AlertTriangle size={20} color={Colors.warning} />;
    return <X size={20} color={Colors.error} />;
  };

  // Use API data if available, otherwise use our database
  const plantName = scanResult.apiData?.plantName || plant.name;
  const plantScientificName = scanResult.apiData?.scientificName || plant.scientificName;
  const diseaseName = scanResult.apiData?.diseaseName || disease.name;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: scanResult.imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>{t('scan.results')}</Text>

          <View style={styles.plantInfoContainer}>
            <Text style={styles.plantName}>{plantName}</Text>
            <Text style={styles.plantScientificName}>{plantScientificName}</Text>
          </View>

          <View style={styles.confidenceContainer}>
            <View style={styles.confidenceHeader}>
              <Text style={styles.confidenceTitle}>{t('scan.diagnosisConfidence')}</Text>
              {getConfidenceIcon(scanResult.confidence)}
            </View>
            <View style={styles.confidenceBar}>
              <View
                style={[
                  styles.confidenceProgress,
                  {
                    width: `${scanResult.confidence * 100}%`,
                    backgroundColor: getConfidenceColor(scanResult.confidence)
                  }
                ]}
              />
            </View>
            <Text style={[styles.confidenceValue, { color: getConfidenceColor(scanResult.confidence) }]}>
              {Math.round(scanResult.confidence * 100)}%
            </Text>
          </View>

          <View style={styles.diseaseContainer}>
            <DiseaseCard
              disease={disease}
              confidence={scanResult.confidence}
            />
          </View>

          {scanResult.apiData?.diseaseDescription && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>{diseaseName}</Text>
              <Text style={styles.descriptionText}>{scanResult.apiData.diseaseDescription}</Text>
            </View>
          )}

          <View style={styles.actionsContainer}>
            <Button
              title={t('scan.viewTreatments')}
              onPress={() => router.push(`/disease/${disease.id}`)}
              variant="primary"
              icon={<ArrowRight size={16} color={Colors.white} />}
              style={styles.actionButton}
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
  imageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: Colors.black,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultContainer: {
    padding: 16,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  plantInfoContainer: {
    marginBottom: 16,
  },
  plantName: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  plantScientificName: {
    fontSize: 14,
    fontStyle: 'italic',
    color: Colors.textLight,
  },
  confidenceContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  confidenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  confidenceTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  confidenceBar: {
    height: 8,
    backgroundColor: Colors.lightGrey,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  confidenceProgress: {
    height: '100%',
    borderRadius: 4,
  },
  confidenceValue: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  diseaseContainer: {
    marginBottom: 16,
  },
  descriptionContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
  },
  actionsContainer: {
    marginTop: 8,
  },
  actionButton: {
    marginBottom: 12,
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
    marginBottom: 20,
  },
});