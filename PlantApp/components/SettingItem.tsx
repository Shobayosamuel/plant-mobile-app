import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import Colors from '@/constants/colors';
import { ChevronRight } from 'lucide-react-native';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  toggle?: boolean;
  onToggle?: (value: boolean) => void;
  value?: boolean;
}

export const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  toggle,
  onToggle,
  value
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={!onPress || toggle}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {toggle && onToggle ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: Colors.lightGrey, true: Colors.secondary }}
          thumbColor={value ? Colors.primary : Colors.white}
        />
      ) : onPress ? (
        <ChevronRight size={20} color={Colors.grey} />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 2,
  },
});