import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { PlantDisease } from '@/types/plant';
import { Card } from './Card';
import { useTranslations } from '@/hooks/use-translations';
import Colors from '@/constants/colors';
import { AlertTriangle } from 'lucide-react-native';

interface DiseaseCardProps {
  disease: PlantDisease;
  confidence?: number;
}

export const DiseaseCard: React.FC<DiseaseCardProps> = ({
  disease,
  confidence
}) => {
  const router = useRouter();
  const { t } = useTranslations();

  const handlePress = () => {
    router.push(`/disease/${disease.id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{disease.name}</Text>
            <Text style={styles.scientificName}>{disease.scientificName}</Text>
          </View>
          {confidence !== undefined && (
            <View style={styles.confidenceContainer}>
              <AlertTriangle size={16} color={getConfidenceColor(confidence)} />
              <Text style={[styles.confidence, { color: getConfidenceColor(confidence) }]}>
                {Math.round(confidence * 100)}%
              </Text>
            </View>
          )}
        </View>

        {disease.images && disease.images.length > 0 && (
          <Image
            source={{ uri: disease.images[0] }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        <View style={styles.infoContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('disease.symptoms')}</Text>
            <View style={styles.bulletList}>
              {disease.symptoms.slice(0, 2).map((symptom, index) => (
                <View key={index} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{symptom}</Text>
                </View>
              ))}
              {disease.symptoms.length > 2 && (
                <Text style={styles.moreText}>+{disease.symptoms.length - 2} more</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.viewMore}>View details</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const getConfidenceColor = (confidence: number): string => {
  if (confidence >= 0.7) return Colors.success;
  if (confidence >= 0.4) return Colors.warning;
  return Colors.error;
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  scientificName: {
    fontSize: 12,
    fontStyle: 'italic',
    color: Colors.textLight,
    marginTop: 2,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGrey,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidence: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  image: {
    width: '100%',
    height: 160,
  },
  infoContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  bulletList: {
    marginLeft: 4,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bullet: {
    marginRight: 8,
    color: Colors.primary,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textLight,
  },
  moreText: {
    fontSize: 12,
    color: Colors.primary,
    marginTop: 4,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors.lightGrey,
    padding: 12,
    alignItems: 'center',
  },
  viewMore: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
});