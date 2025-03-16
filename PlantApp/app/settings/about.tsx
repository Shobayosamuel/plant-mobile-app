import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useTranslations } from '@/hooks/use-translations';
import Colors from '@/constants/colors';
import { Button } from '@/components/Button';
import { ExternalLink, Github, Mail } from 'lucide-react-native';

export default function AboutScreen() {
  const { t } = useTranslations();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen options={{ title: t('settings.about') }} />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070&auto=format&fit=crop' }}
            style={styles.logo}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.title}>Plant Health Assistant</Text>
        <Text style={styles.version}>Version 1.0.0</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>
            Plant Health Assistant is designed to help farmers and agricultural enthusiasts identify plant diseases and get treatment recommendations. The app uses image recognition to detect diseases and provides detailed information about treatments and preventive measures.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>Detect plant diseases using your camera</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>Get detailed information about diseases</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>Access treatment recommendations</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>Learn preventive measures</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>Use offline after initial data download</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>Multiple language support</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <Button
            title="Visit Website"
            onPress={() => Linking.openURL('https://example.com')}
            variant="outline"
            icon={<ExternalLink size={16} color={Colors.primary} />}
            style={styles.contactButton}
          />
          <Button
            title="Email Support"
            onPress={() => Linking.openURL('mailto:support@example.com')}
            variant="outline"
            icon={<Mail size={16} color={Colors.primary} />}
            style={styles.contactButton}
          />
          <Button
            title="GitHub Repository"
            onPress={() => Linking.openURL('https://github.com/example/plant-health-assistant')}
            variant="outline"
            icon={<Github size={16} color={Colors.primary} />}
            style={styles.contactButton}
          />
        </View>

        <Text style={styles.copyright}>© 2023 Plant Health Assistant. All rights reserved.</Text>
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
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  version: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
  },
  featureList: {
    marginLeft: 4,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  featureBullet: {
    marginRight: 8,
    color: Colors.primary,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
  },
  contactButton: {
    marginBottom: 12,
  },
  copyright: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: 16,
  },
});