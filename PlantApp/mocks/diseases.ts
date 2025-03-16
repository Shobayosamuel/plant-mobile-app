import { PlantDisease } from '@/types/plant';

export const DISEASES: PlantDisease[] = [
  {
    id: 'late-blight',
    name: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    symptoms: [
      'Dark, water-soaked spots on leaves',
      'White, fuzzy growth on leaf undersides',
      'Brown lesions on stems',
      'Rapidly spreading infection',
      'Plant collapse in severe cases'
    ],
    causes: [
      'Fungal pathogen Phytophthora infestans',
      'Cool, wet weather conditions',
      'Poor air circulation',
      'Overhead irrigation'
    ],
    affectedPlants: ['tomato', 'potato', 'eggplant'],
    images: [
      'https://images.unsplash.com/photo-1598512752271-33f913a5af13?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596100830041-b43fea8e4f2c?q=80&w=1974&auto=format&fit=crop'
    ],
    treatments: {
      chemical: [
        'Copper-based fungicides',
        'Chlorothalonil',
        'Mancozeb',
        'Propamocarb'
      ],
      organic: [
        'Copper sulfate',
        'Neem oil spray',
        'Baking soda solution (1 tbsp per gallon of water with a few drops of liquid soap)',
        'Remove and destroy infected plant parts'
      ]
    },
    preventiveMeasures: [
      'Plant resistant varieties',
      'Ensure good air circulation',
      'Avoid overhead watering',
      'Rotate crops',
      'Clean tools and equipment',
      'Remove plant debris at the end of the season'
    ]
  },
  {
    id: 'powdery-mildew',
    name: 'Powdery Mildew',
    scientificName: 'Various fungi including Erysiphe, Podosphaera, and Leveillula',
    symptoms: [
      'White powdery spots on leaves and stems',
      'Yellowing of leaves',
      'Distorted growth',
      'Premature leaf drop',
      'Reduced yield'
    ],
    causes: [
      'Fungal pathogens',
      'High humidity with dry leaf surfaces',
      'Moderate temperatures (60-80°F)',
      'Poor air circulation'
    ],
    affectedPlants: ['cucumber', 'squash', 'melon', 'zucchini', 'pumpkin', 'rose', 'grape'],
    images: [
      'https://images.unsplash.com/photo-1598512752271-33f913a5af13?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596100830041-b43fea8e4f2c?q=80&w=1974&auto=format&fit=crop'
    ],
    treatments: {
      chemical: [
        'Sulfur-based fungicides',
        'Potassium bicarbonate',
        'Trifloxystrobin',
        'Myclobutanil'
      ],
      organic: [
        'Milk spray (1 part milk to 9 parts water)',
        'Neem oil',
        'Potassium bicarbonate',
        'Sulfur dust (not during hot weather)'
      ]
    },
    preventiveMeasures: [
      'Plant resistant varieties',
      'Ensure proper spacing for air circulation',
      'Avoid overhead watering',
      'Water in the morning',
      'Remove and destroy infected plant parts',
      'Rotate crops'
    ]
  },
  {
    id: 'leaf-spot',
    name: 'Leaf Spot',
    scientificName: 'Various fungi including Septoria, Cercospora, and Alternaria',
    symptoms: [
      'Small, dark spots on leaves',
      'Spots may have yellow halos',
      'Spots may merge to form larger lesions',
      'Leaf yellowing and drop',
      'Reduced plant vigor'
    ],
    causes: [
      'Fungal pathogens',
      'Wet conditions',
      'Splashing water',
      'Poor air circulation',
      'Plant debris'
    ],
    affectedPlants: ['tomato', 'pepper', 'strawberry', 'corn', 'bean'],
    images: [
      'https://images.unsplash.com/photo-1598512752271-33f913a5af13?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596100830041-b43fea8e4f2c?q=80&w=1974&auto=format&fit=crop'
    ],
    treatments: {
      chemical: [
        'Chlorothalonil',
        'Mancozeb',
        'Copper-based fungicides',
        'Azoxystrobin'
      ],
      organic: [
        'Copper sulfate',
        'Neem oil',
        'Compost tea',
        'Remove and destroy infected leaves'
      ]
    },
    preventiveMeasures: [
      'Rotate crops',
      'Avoid overhead watering',
      'Ensure proper spacing',
      'Remove plant debris',
      'Use mulch to prevent soil splash',
      'Clean tools and equipment'
    ]
  },
  {
    id: 'root-rot',
    name: 'Root Rot',
    scientificName: 'Various fungi including Pythium, Phytophthora, and Fusarium',
    symptoms: [
      'Wilting despite adequate soil moisture',
      'Yellowing leaves',
      'Stunted growth',
      'Brown, soft roots',
      'Plant collapse'
    ],
    causes: [
      'Fungal pathogens',
      'Overwatering',
      'Poor drainage',
      'Compacted soil',
      'High soil temperatures'
    ],
    affectedPlants: ['tomato', 'pepper', 'cucumber', 'bean', 'corn', 'soybean'],
    images: [
      'https://images.unsplash.com/photo-1598512752271-33f913a5af13?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596100830041-b43fea8e4f2c?q=80&w=1974&auto=format&fit=crop'
    ],
    treatments: {
      chemical: [
        'Fosetyl-aluminum',
        'Mefenoxam',
        'Propamocarb',
        'Etridiazole'
      ],
      organic: [
        'Improve drainage',
        'Reduce watering frequency',
        'Apply beneficial microbes (Trichoderma)',
        'Remove and destroy infected plants'
      ]
    },
    preventiveMeasures: [
      'Ensure good drainage',
      'Avoid overwatering',
      'Use raised beds in heavy soils',
      'Rotate crops',
      'Use disease-free transplants',
      'Sterilize pots and tools'
    ]
  },
  {
    id: 'bacterial-wilt',
    name: 'Bacterial Wilt',
    scientificName: 'Ralstonia solanacearum',
    symptoms: [
      'Sudden wilting of plants',
      'No recovery at night',
      'Brown discoloration in vascular tissue',
      'Bacterial ooze in water when stem is cut',
      'Plant death'
    ],
    causes: [
      'Bacterial pathogen Ralstonia solanacearum',
      'Warm, humid conditions',
      'Infected soil',
      'Contaminated tools and equipment',
      'Insect damage'
    ],
    affectedPlants: ['tomato', 'potato', 'eggplant', 'pepper', 'banana'],
    images: [
      'https://images.unsplash.com/photo-1598512752271-33f913a5af13?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596100830041-b43fea8e4f2c?q=80&w=1974&auto=format&fit=crop'
    ],
    treatments: {
      chemical: [
        'No effective chemical controls',
        'Copper-based bactericides may help prevent spread',
        'Soil fumigation in severe cases',
        'Antibiotics (limited effectiveness)'
      ],
      organic: [
        'Remove and destroy infected plants',
        'Solarize soil',
        'Crop rotation with non-host plants',
        'Improve soil health with compost'
      ]
    },
    preventiveMeasures: [
      'Plant resistant varieties',
      'Rotate crops with non-host plants',
      'Avoid planting in infected soil',
      'Control insect pests',
      'Clean tools and equipment',
      'Avoid wounding plants'
    ]
  }
];

export const getDisease = (id: string): PlantDisease | undefined => {
  return DISEASES.find(disease => disease.id === id);
};