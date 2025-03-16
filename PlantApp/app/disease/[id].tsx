import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslations } from '@/hooks/use-translations';
import { getDisease } from '@/mocks/diseases';
import { getPlant } from '@/mocks/plants';
import Colors from '@/constants/colors';
import { AlertTriangle, Check, Leaf, Pill, Shield } from 'lucide-react-native';

export default function DiseaseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslations();

  const disease = getDisease(id);

  if (!disease) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{t('disease.notFound')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Get affected plants
  const affectedPlants = disease.affectedPlants
    .map(plantId => getPlant(plantId))
    .filter(plant => plant !== undefined);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen options={{ title: disease.name }} />

      <ScrollView style={styles.scrollView}>
        {disease.images && disease.images.length > 0 && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: disease.images[0] }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}

        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{disease.name}</Text>
            <Text style={styles.scientificName}>{disease.scientificName}</Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <AlertTriangle size={20} color={Colors.warning} />
              <Text style={styles.sectionTitle}>{t('disease.symptoms')}</Text>
            </View>
            <View style={styles.bulletList}>
              {disease.symptoms.map((symptom, index) => (
                <View key={index} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{symptom}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Leaf size={20} color={Colors.error} />
              <Text style={styles.sectionTitle}>{t('disease.causes')}</Text>
            </View>
            <View style={styles.bulletList}>
              {disease.causes.map((cause, index) => (
                <View key={index} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{cause}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Pill size={20} color={Colors.primary} />
              <Text style={styles.sectionTitle}>{t('disease.treatments')}</Text>
            </View>

            <View style={styles.treatmentContainer}>
              <Text style={styles.treatmentTitle}>{t('disease.chemical')}</Text>
              <View style={styles.bulletList}>
                {disease.treatments.chemical.map((treatment, index) => (
                  <View key={index} style={styles.bulletItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{treatment}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.treatmentContainer}>
              <Text style={styles.treatmentTitle}>{t('disease.organic')}</Text>
              <View style={styles.bulletList}>
                {disease.treatments.organic.map((treatment, index) => (
                  <View key={index} style={styles.bulletItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{treatment}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Shield size={20} color={Colors.success} />
              <Text style={styles.sectionTitle}>{t('disease.prevention')}</Text>
            </View>
            <View style={styles.bulletList}>
              {disease.preventiveMeasures.map((measure, index) => (
                <View key={index} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{measure}</Text>
                </View>
              ))}
            </View>
          </View>

          {affectedPlants.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('disease.affectedPlants')}</Text>
              <View style={styles.affectedPlantsContainer}>
                {affectedPlants.map(plant => (
                  plant && (
                    <View key={plant.id} style={styles.affectedPlantItem}>
                      <Text style={styles.affectedPlantName}>{plant.name}</Text>
                    </View>
                  )
                ))}
              </View>
            </View>
          )}
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
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
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
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 8,
  },
  bulletList: {
    marginLeft: 4,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    marginRight: 8,
    color: Colors.primary,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
  },
  treatmentContainer: {
    marginBottom: 16,
  },
  treatmentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  affectedPlantsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  affectedPlantItem: {
    backgroundColor: Colors.lightGrey,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  affectedPlantName: {
    fontSize: 14,
    color: Colors.text,
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