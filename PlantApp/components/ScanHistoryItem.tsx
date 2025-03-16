import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScanResult } from '@/types/plant';
import { getDisease } from '@/mocks/diseases';
import { getPlant } from '@/mocks/plants';
import Colors from '@/constants/colors';
import { Calendar, Trash2 } from 'lucide-react-native';
import { useAppStore } from '@/store/app-store';

interface ScanHistoryItemProps {
  scan: ScanResult;
}

export const ScanHistoryItem: React.FC<ScanHistoryItemProps> = ({ scan }) => {
  const router = useRouter();
  const deleteScanResult = useAppStore(state => state.deleteScanResult);

  const disease = getDisease(scan.diseaseId);
  const plant = getPlant(scan.plantId);

  if (!disease || !plant) return null;

  const handlePress = () => {
    router.push(`/scan-result/${scan.id}`);
  };

  const handleDelete = () => {
    deleteScanResult(scan.id);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.container}>
        <Image
          source={{ uri: scan.imageUri }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.plantName}>{plant.name}</Text>
            <Text style={styles.diseaseName}>{disease.name}</Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.dateContainer}>
              <Calendar size={14} color={Colors.textLight} />
              <Text style={styles.date}>{formatDate(scan.timestamp)}</Text>
            </View>

            <TouchableOpacity
              onPress={handleDelete}
              style={styles.deleteButton}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <Trash2 size={16} color={Colors.error} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 8,
  },
  plantName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  diseaseName: {
    fontSize: 14,
    color: Colors.textLight,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: Colors.textLight,
    marginLeft: 4,
  },
  deleteButton: {
    padding: 4,
  },
});