import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card } from './Card';
import { PlantTip } from '@/mocks/tips';
import Colors from '@/constants/colors';
import { Lightbulb } from 'lucide-react-native';

interface TipCardProps {
  tip: PlantTip;
}

export const TipCard: React.FC<TipCardProps> = ({ tip }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Lightbulb size={20} color={Colors.accent} />
        <Text style={styles.title}>{tip.title}</Text>
      </View>

      {tip.imageUrl && (
        <Image
          source={{ uri: tip.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <Text style={styles.content}>{tip.content}</Text>

      <View style={styles.categoryContainer}>
        <Text style={styles.category}>{getCategoryLabel(tip.category)}</Text>
      </View>
    </Card>
  );
};

const getCategoryLabel = (category: string): string => {
  switch (category) {
    case 'general': return 'General';
    case 'watering': return 'Watering';
    case 'fertilizing': return 'Fertilizing';
    case 'pest': return 'Pest Control';
    case 'disease': return 'Disease Prevention';
    default: return category;
  }
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 8,
    flex: 1,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 12,
  },
  content: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
  },
  categoryContainer: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  category: {
    fontSize: 12,
    color: Colors.primary,
    backgroundColor: Colors.lightGrey,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
});