export type PlantTip = {
    id: string;
    title: string;
    content: string;
    category: 'general' | 'watering' | 'fertilizing' | 'pest' | 'disease';
    imageUrl?: string;
  };

  export const PLANT_TIPS: PlantTip[] = [
    {
      id: 'tip-1',
      title: 'Proper Watering Techniques',
      content: 'Water plants at the base rather than from above to prevent leaf diseases. Early morning is the best time to water as it allows leaves to dry during the day, reducing disease risk.',
      category: 'watering',
      imageUrl: 'https://images.unsplash.com/photo-1563299796-17596ed6b017?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'tip-2',
      title: 'Crop Rotation',
      content: 'Avoid planting the same crop in the same location year after year. Rotate crops to prevent the buildup of soil-borne diseases and pests specific to certain plant families.',
      category: 'general',
      imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'tip-3',
      title: 'Proper Plant Spacing',
      content: 'Ensure adequate spacing between plants to promote good air circulation. This helps leaves dry faster after rain or irrigation, reducing the risk of fungal diseases.',
      category: 'general',
      imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2069&auto=format&fit=crop'
    },
    {
      id: 'tip-4',
      title: 'Organic Mulching',
      content: 'Apply organic mulch around plants to conserve moisture, suppress weeds, and prevent soil-borne diseases from splashing onto leaves during rain or irrigation.',
      category: 'general',
      imageUrl: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=2071&auto=format&fit=crop'
    },
    {
      id: 'tip-5',
      title: 'Balanced Fertilization',
      content: 'Avoid over-fertilizing, especially with nitrogen, as it can lead to lush, tender growth that is more susceptible to diseases and pests. Follow recommended rates for your specific crops.',
      category: 'fertilizing',
      imageUrl: 'https://images.unsplash.com/photo-1589928558003-9d3a9dcde173?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'tip-6',
      title: 'Regular Monitoring',
      content: 'Inspect plants regularly for signs of diseases or pests. Early detection allows for prompt intervention before problems become severe.',
      category: 'general',
      imageUrl: 'https://images.unsplash.com/photo-1598512752271-33f913a5af13?q=80&w=2071&auto=format&fit=crop'
    },
    {
      id: 'tip-7',
      title: 'Sanitation Practices',
      content: 'Remove and destroy diseased plant material promptly. Do not compost diseased plants as the pathogens may survive and spread when the compost is used.',
      category: 'disease',
      imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'tip-8',
      title: 'Companion Planting',
      content: 'Some plants can help repel pests or attract beneficial insects when planted together. For example, marigolds can repel nematodes, and basil can deter certain pests from tomatoes.',
      category: 'pest',
      imageUrl: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=2071&auto=format&fit=crop'
    },
    {
      id: 'tip-9',
      title: 'Tool Sanitation',
      content: 'Clean and disinfect gardening tools regularly, especially after working with diseased plants, to prevent spreading pathogens to healthy plants.',
      category: 'disease',
      imageUrl: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=2071&auto=format&fit=crop'
    },
    {
      id: 'tip-10',
      title: 'Proper Pruning',
      content: 'Prune plants to improve air circulation and remove diseased or damaged parts. Always use clean, sharp tools and make clean cuts to minimize plant stress.',
      category: 'general',
      imageUrl: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=2071&auto=format&fit=crop'
    }
  ];