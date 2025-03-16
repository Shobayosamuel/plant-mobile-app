import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { PlantType } from '@/types/plant';
import { Card } from './Card';
import Colors from '@/constants/colors';

interface PlantCardProps {
  plant: PlantType;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/plant/${plant.id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <Image
          source={{ uri: plant.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.name}>{plant.name}</Text>
          <Text style={styles.scientificName}>{plant.scientificName}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    width: 160,
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: 120,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  scientificName: {
    fontSize: 12,
    fontStyle: 'italic',
    color: Colors.textLight,
    marginTop: 2,
  },
});