export type PlantDisease = {
    id: string;
    name: string;
    scientificName: string;
    symptoms: string[];
    causes: string[];
    affectedPlants: string[];
    images: string[];
    treatments: {
      chemical: string[];
      organic: string[];
    };
    preventiveMeasures: string[];
  };

  export type PlantType = {
    id: string;
    name: string;
    scientificName: string;
    commonDiseases: string[]; // References to disease IDs
    image: string;
  };

  export type ScanResult = {
    id: string;
    plantId: string;
    diseaseId: string;
    confidence: number;
    imageUri: string;
    timestamp: number;
    notes?: string;
    apiData?: {
      plantName: string;
      scientificName: string;
      diseaseName: string;
      diseaseDescription: string;
      treatments: {
        chemical: string[];
        biological: string[];
        prevention: string[];
      }
    };
  };