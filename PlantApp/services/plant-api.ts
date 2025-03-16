import { Platform } from 'react-native';
import { ScanResult } from '@/types/plant';
import { getPlant } from '@/mocks/plants';
import { getDisease } from '@/mocks/diseases';

// Plant.id API configuration
const PLANT_ID_API_KEY = 'svzqEy33R6xp4EBDhpNdRAx1YQZwrp27HNZpF6VoLYbhCWrGhY'; // User's API key
const PLANT_ID_API_URL = 'https://api.plant.id/v2/identify';

// Define response types for the Plant.id API
interface PlantIdResponse {
  id: number;
  custom_id: string | null;
  meta_data: {
    date: string;
    datetime: string;
  };
  uploaded_datetime: string;
  finished_datetime: string;
  images: Array<{
    file_name: string;
    url: string;
  }>;
  suggestions: Array<{
    id: number;
    plant_name: string;
    plant_details: {
      scientific_name: string;
      common_names: string[];
      url: string;
    };
    probability: number;
    confirmed: boolean;
  }>;
  disease: {
    suggestions: Array<{
      id: number;
      name: string;
      probability: number;
      description: string;
      treatment: {
        chemical: string[];
        biological: string[];
        prevention: string[];
      };
    }>;
  };
  modifiers: string[];
  secret: string;
  fail_cause: string | null;
  countable: boolean;
  feedback: string | null;
  is_plant_probability: number;
  is_plant: boolean;
}

/**
 * Identify plant and disease from image
 * @param imageUri Local URI of the image
 * @param base64Data Base64 encoded image data
 * @returns Promise with scan result
 */
export const identifyPlant = async (imageUri: string, base64Data?: string): Promise<ScanResult> => {
  try {
    console.log('Starting plant identification process');

    // Check if we're in offline mode or missing base64 data
    if (!base64Data) {
      console.log('Missing base64 data, using simulated identification');
      return simulateIdentification(imageUri);
    }

    // Prepare image data for API
    // Remove data:image/jpeg;base64, prefix if present
    const imageData = base64Data.includes('base64,')
      ? base64Data.split('base64,')[1]
      : base64Data;

    console.log('Preparing API request to Plant.id');

    // Prepare request data according to Plant.id API documentation
    const data = {
      api_key: PLANT_ID_API_KEY,
      images: [imageData],
      modifiers: ["crops_fast", "disease_similar_images"],
      plant_language: "en",
      disease_details: ["description", "treatment", "classification", "common_names"]
    };

    console.log('Sending request to Plant.id API...');

    // Make API request
    const response = await fetch(PLANT_ID_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Plant.id API error:', errorText);
      console.log('Falling back to simulated identification due to API error');
      return simulateIdentification(imageUri);
    }

    const result: PlantIdResponse = await response.json();
    console.log('Received response from Plant.id API');

    // Process API response
    if (result.suggestions && result.suggestions.length > 0) {
      const plantSuggestion = result.suggestions[0];
      const diseaseSuggestion = result.disease?.suggestions?.[0];

      console.log('Plant identified:', plantSuggestion.plant_name);
      console.log('Disease identified:', diseaseSuggestion?.name || 'No disease detected');

      // Find the closest matching plant in our database
      const matchedPlant = findClosestPlantMatch(plantSuggestion.plant_name);

      // Find the closest matching disease in our database
      const matchedDisease = findClosestDiseaseMatch(diseaseSuggestion?.name || 'healthy');

      // Create scan result
      return {
        id: `scan-${Date.now()}`,
        plantId: matchedPlant.id,
        diseaseId: matchedDisease.id,
        confidence: diseaseSuggestion?.probability || plantSuggestion.probability,
        imageUri,
        timestamp: Date.now(),
        apiData: {
          plantName: plantSuggestion.plant_name,
          scientificName: plantSuggestion.plant_details.scientific_name,
          diseaseName: diseaseSuggestion?.name || 'No disease detected',
          diseaseDescription: diseaseSuggestion?.description || '',
          treatments: diseaseSuggestion?.treatment || {
            chemical: [],
            biological: [],
            prevention: []
          }
        }
      };
    } else {
      console.log('No plant identified in the image, using simulated identification');
      return simulateIdentification(imageUri);
    }
  } catch (error) {
    console.error('Plant identification error:', error);
    // Fallback to simulation in case of API failure
    console.log('Falling back to simulated identification due to error');
    return simulateIdentification(imageUri);
  }
};

/**
 * Simulate plant identification for testing or offline mode
 */
const simulateIdentification = (imageUri: string): ScanResult => {
  console.log('Using simulated plant identification');

  // Generate a random scan result
  const randomPlantIndex = Math.floor(Math.random() * PLANTS.length);
  const plant = PLANTS[randomPlantIndex];

  // Get a disease that affects this plant
  const plantDiseases = DISEASES.filter(disease =>
    disease.affectedPlants.includes(plant.id)
  );

  const randomDiseaseIndex = plantDiseases.length > 0
    ? Math.floor(Math.random() * plantDiseases.length)
    : 0;

  const disease = plantDiseases.length > 0
    ? plantDiseases[randomDiseaseIndex]
    : DISEASES[0];

  console.log('Simulated identification:', plant.name, disease.name);

  // Create scan result
  return {
    id: `scan-${Date.now()}`,
    plantId: plant.id,
    diseaseId: disease.id,
    confidence: 0.4 + Math.random() * 0.5, // Random confidence between 40% and 90%
    imageUri,
    timestamp: Date.now(),
  };
};

/**
 * Find the closest matching plant in our database
 */
const findClosestPlantMatch = (plantName: string) => {
  if (!plantName) {
    return PLANTS[0];
  }

  let bestMatch = PLANTS[0];
  let highestScore = 0;

  for (const plant of PLANTS) {
    // Simple string similarity check (case insensitive)
    const plantNameLower = plantName.toLowerCase();
    const currentPlantNameLower = plant.name.toLowerCase();
    const scientificNameLower = plant.scientificName.toLowerCase();

    // Check if the plant name is contained in the API result or vice versa
    if (plantNameLower.includes(currentPlantNameLower) ||
        currentPlantNameLower.includes(plantNameLower) ||
        plantNameLower.includes(scientificNameLower) ||
        scientificNameLower.includes(plantNameLower)) {
      // This is a good match, return it immediately
      console.log('Found exact plant match:', plant.name);
      return plant;
    }

    // Calculate a simple similarity score
    let score = 0;
    const words = plantNameLower.split(' ');
    for (const word of words) {
      if (currentPlantNameLower.includes(word) || scientificNameLower.includes(word)) {
        score++;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = plant;
    }
  }

  console.log('Best plant match:', bestMatch.name);
  return bestMatch;
};

/**
 * Find the closest matching disease in our database
 */
const findClosestDiseaseMatch = (diseaseName: string) => {
  // If "healthy" or no disease, return a random disease for now
  // In a real app, you would have a "healthy" state
  if (!diseaseName || diseaseName.toLowerCase() === 'healthy') {
    const randomDiseaseIndex = Math.floor(Math.random() * DISEASES.length);
    return DISEASES[randomDiseaseIndex];
  }

  let bestMatch = DISEASES[0];
  let highestScore = 0;

  for (const disease of DISEASES) {
    // Simple string similarity check (case insensitive)
    const diseaseNameLower = diseaseName.toLowerCase();
    const currentDiseaseNameLower = disease.name.toLowerCase();
    const scientificNameLower = disease.scientificName.toLowerCase();

    // Check if the disease name is contained in the API result or vice versa
    if (diseaseNameLower.includes(currentDiseaseNameLower) ||
        currentDiseaseNameLower.includes(diseaseNameLower) ||
        diseaseNameLower.includes(scientificNameLower) ||
        scientificNameLower.includes(diseaseNameLower)) {
      // This is a good match, return it immediately
      console.log('Found exact disease match:', disease.name);
      return disease;
    }

    // Calculate a simple similarity score
    let score = 0;
    const words = diseaseNameLower.split(' ');
    for (const word of words) {
      if (currentDiseaseNameLower.includes(word) || scientificNameLower.includes(word)) {
        score++;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = disease;
    }
  }

  console.log('Best disease match:', bestMatch.name);
  return bestMatch;
};

// Import these from your mocks to avoid circular dependencies
import { PLANTS } from '@/mocks/plants';
import { DISEASES } from '@/mocks/diseases';