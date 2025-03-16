import { PlantType } from '@/types/plant';

export const PLANTS: PlantType[] = [
  {
    id: 'tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    commonDiseases: ['late-blight', 'leaf-spot', 'root-rot', 'bacterial-wilt'],
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'potato',
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    commonDiseases: ['late-blight', 'bacterial-wilt'],
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'cucumber',
    name: 'Cucumber',
    scientificName: 'Cucumis sativus',
    commonDiseases: ['powdery-mildew', 'root-rot'],
    image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'corn',
    name: 'Corn',
    scientificName: 'Zea mays',
    commonDiseases: ['leaf-spot', 'root-rot'],
    image: 'https://images.unsplash.com/photo-1601593768799-76e7c2a32369?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'pepper',
    name: 'Pepper',
    scientificName: 'Capsicum annuum',
    commonDiseases: ['leaf-spot', 'root-rot', 'bacterial-wilt'],
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=2070&auto=format&fit=crop'
  }
];

export const getPlant = (id: string): PlantType | undefined => {
  return PLANTS.find(plant => plant.id === id);
};