import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Platform, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

interface ImagePickerResult {
  uri: string;
  base64?: string;
}

export const useImagePicker = () => {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Convert image URI to base64
   */
  const getBase64FromUri = async (uri: string): Promise<string | undefined> => {
    try {
      // Skip for web platform as it's handled differently
      if (Platform.OS === 'web') {
        console.log('Web platform detected, skipping base64 conversion');
        return undefined;
      }

      // Check if the URI is valid
      if (!uri || typeof uri !== 'string') {
        console.error('Invalid URI provided for base64 conversion');
        return undefined;
      }

      console.log('Converting image to base64...');

      // Read the file and convert to base64
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log('Base64 conversion successful');
      return base64;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return undefined;
    }
  };

  /**
   * Launch camera to take a photo
   */
  const takePhoto = async (): Promise<ImagePickerResult | null> => {
    try {
      setIsLoading(true);

      // Request permission
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        console.log('Camera permission denied');
        Alert.alert(
          'Permission Required',
          'Camera permission is required to take photos.',
          [{ text: 'OK' }]
        );
        setIsLoading(false);
        return null;
      }

      console.log('Launching camera...');

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true, // Request base64 data directly
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const uri = asset.uri;

        console.log('Photo captured successfully');

        // Get base64 data if not already provided
        let base64 = asset.base64;
        if (!base64) {
          console.log('Base64 not provided by camera, converting manually...');
          base64 = await getBase64FromUri(uri);
        }

        setIsLoading(false);
        return { uri, base64 };
      }

      console.log('Camera capture canceled or failed');
      setIsLoading(false);
      return null;
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert(
        'Error',
        'Failed to capture photo. Please try again.',
        [{ text: 'OK' }]
      );
      setIsLoading(false);
      return null;
    }
  };

  /**
   * Pick an image from the device's library
   */
  const pickImage = async (): Promise<ImagePickerResult | null> => {
    try {
      setIsLoading(true);

      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        console.log('Media library permission denied');
        Alert.alert(
          'Permission Required',
          'Media library permission is required to select photos.',
          [{ text: 'OK' }]
        );
        setIsLoading(false);
        return null;
      }

      console.log('Launching image picker...');

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true, // Request base64 data directly
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const uri = asset.uri;

        console.log('Image selected successfully');

        // Get base64 data if not already provided
        let base64 = asset.base64;
        if (!base64) {
          console.log('Base64 not provided by picker, converting manually...');
          base64 = await getBase64FromUri(uri);
        }

        setIsLoading(false);
        return { uri, base64 };
      }

      console.log('Image selection canceled or failed');
      setIsLoading(false);
      return null;
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert(
        'Error',
        'Failed to select image. Please try again.',
        [{ text: 'OK' }]
      );
      setIsLoading(false);
      return null;
    }
  };

  return {
    isLoading,
    takePhoto,
    pickImage
  };
};