import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslations } from '@/hooks/use-translations';
import { useAppStore } from '@/store/app-store';
import { PLANTS } from '@/mocks/plants';
import { DISEASES } from '@/mocks/diseases';
import { PlantCard } from '@/components/PlantCard';
import { Button } from '@/components/Button';
import Colors from '@/constants/colors';
import { Camera, Image as ImageIcon, Scan } from 'lucide-react-native';
import { ScanResult } from '@/types/plant';
import { useImagePicker } from '@/hooks/use-image-picker';
import { identifyPlant } from '@/services/plant-api';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslations();
  const addScanResult = useAppStore(state => state.addScanResult);
  const offlineMode = useAppStore(state => state.offlineMode);

  const [isScanning, setIsScanning] = useState(false);
  const { isLoading, takePhoto, pickImage } = useImagePicker();

  const handleScan = async () => {
    try {
      const result = await takePhoto();

      if (result) {
        // Start scanning process
        setIsScanning(true);

        try {
          console.log('Starting plant identification with image URI:', result.uri?.substring(0, 30) + '...');

          // Call the plant identification API
          const scanResult = await identifyPlant(result.uri, result.base64);

          console.log('Plant identification successful, saving result');

          // Save to store
          addScanResult(scanResult);

          // Navigate to result screen
          setIsScanning(false);
          router.push(`/scan/${scanResult.id}`);
        } catch (error) {
          console.error('Error identifying plant:', error);
          setIsScanning(false);
          Alert.alert(
            t('scan.error.title'),
            t('scan.error.message'),
            [{ text: t('common.ok') }]
          );
        }
      } else {
        console.log('No image captured or user canceled');
      }
    } catch (error) {
      console.error('Error scanning:', error);
      setIsScanning(false);
      Alert.alert(
        t('scan.error.title'),
        t('scan.error.cameraMessage'),
        [{ text: t('common.ok') }]
      );
    }
  };

  const handlePickImage = async () => {
    try {
      const result = await pickImage();

      if (result) {
        // Start scanning process
        setIsScanning(true);

        try {
          console.log('Starting plant identification with selected image');

          // Call the plant identification API
          const scanResult = await identifyPlant(result.uri, result.base64);

          console.log('Plant identification successful, saving result');

          // Save to store
          addScanResult(scanResult);

          // Navigate to result screen
          setIsScanning(false);
          router.push(`/scan/${scanResult.id}`);
        } catch (error) {
          console.error('Error identifying plant:', error);
          setIsScanning(false);
          Alert.alert(
            t('scan.error.title'),
            t('scan.error.message'),
            [{ text: t('common.ok') }]
          );
        }
      } else {
        console.log('No image selected or user canceled');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      setIsScanning(false);
      Alert.alert(
        t('scan.error.title'),
        t('scan.error.galleryMessage'),
        [{ text: t('common.ok') }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070&auto=format&fit=crop' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>{t('home.heroTitle')}</Text>
            <Text style={styles.heroSubtitle}>{t('home.heroSubtitle')}</Text>
          </View>
        </View>

        {/* Scan Options */}
        <View style={styles.scanOptionsContainer}>
          <TouchableOpacity
            style={styles.scanOption}
            onPress={handleScan}
            disabled={isScanning || isLoading}
          >
            <View style={styles.scanOptionIcon}>
              <Camera size={24} color={Colors.primary} />
            </View>
            <Text style={styles.scanOptionText}>{t('scan.takePhoto')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.scanOption}
            onPress={handlePickImage}
            disabled={isScanning || isLoading}
          >
            <View style={styles.scanOptionIcon}>
              <ImageIcon size={24} color={Colors.primary} />
            </View>
            <Text style={styles.scanOptionText}>{t('scan.uploadImage')}</Text>
          </TouchableOpacity>
        </View>

        {(isScanning || isLoading) && (
          <View style={styles.scanningContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.scanningText}>{t('scan.analyzing')}</Text>
          </View>
        )}

        {offlineMode && (
          <View style={styles.offlineBanner}>
            <Text style={styles.offlineBannerText}>{t('app.offlineMode')}</Text>
          </View>
        )}

        {/* Plants Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('home.commonPlants')}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.plantsContainer}
          >
            {PLANTS.map(plant => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </ScrollView>
        </View>

        {/* Common Diseases Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{t('home.commonDiseases')}</Text>
          <View style={styles.diseasesContainer}>
            {DISEASES.slice(0, 3).map(disease => (
              <TouchableOpacity
                key={disease.id}
                style={styles.diseaseItem}
                onPress={() => router.push(`/disease/${disease.id}`)}
              >
                <Text style={styles.diseaseName}>{disease.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.diseaseItem, styles.viewAllItem]}
              onPress={() => router.push('/tips')}
            >
              <Text style={[styles.diseaseName, styles.viewAllText]}>{t('common.viewAll')}</Text>
            </TouchableOpacity>
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
  heroContainer: {
    height: 200,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.9,
  },
  scanOptionsContainer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  scanOption: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scanOptionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  scanOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  scanningContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  scanningText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.text,
  },
  offlineBanner: {
    backgroundColor: Colors.warning,
    padding: 10,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  offlineBannerText: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: '500',
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  plantsContainer: {
    paddingRight: 16,
  },
  diseasesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  diseaseItem: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    margin: 4,
    width: '48%',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  diseaseName: {
    fontSize: 14,
    color: Colors.text,
  },
  viewAllItem: {
    backgroundColor: Colors.lightGrey,
  },
  viewAllText: {
    color: Colors.primary,
    fontWeight: '500',
  },
});