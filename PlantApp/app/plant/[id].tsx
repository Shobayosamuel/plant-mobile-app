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
import { getPlant } from '@/mocks/plants';
import { getDisease } from '@/mocks/diseases';
import { DiseaseCard } from '@/components/DiseaseCard';
import Colors from '@/constants/colors';

export default function PlantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const plant = getPlant(id);

  if (!plant) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Plant not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Get common diseases for this plant
  const commonDiseases = plant.commonDiseases
    .map(diseaseId => getDisease(diseaseId))
    .filter(disease => disease !== undefined);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen options={{ title: plant.name }} />

      <ScrollView style={styles.scrollView}>
        <Image
          source={{ uri: plant.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{plant.name}</Text>
            <Text style={styles.scientificName}>{plant.scientificName}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Common Diseases</Text>

            {commonDiseases.length > 0 ? (
              <View style={styles.diseasesContainer}>
                {commonDiseases.map(disease => (
                  disease && (
                    <DiseaseCard
                      key={disease.id}
                      disease={disease}
                    />
                  )
                ))}
              </View>
            ) : (
              <Text style={styles.emptyText}>No common diseases found for this plant.</Text>
            )}
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
  },
  scientificName: {
    fontSize: 16,
    fontStyle: 'italic',
    color: Colors.textLight,
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  diseasesContainer: {
    marginTop: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textLight,
    fontStyle: 'italic',
    marginTop: 8,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
  },
});