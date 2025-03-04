
export const categories = [
    { id: 'executive', name: 'Executive', icon: 'briefcase' as const, description: 'Premium business travel' },
    { id: 'luxury', name: 'Luxury', icon: 'star' as const, description: 'Ultimate comfort' },
    { id: 'family', name: 'Family/Group', icon: 'account-group' as const, description: 'Spacious vehicles' },
    { id: 'events', name: 'Special Events', icon: 'party-popper' as const, description: 'Weddings & ceremonies' },
    { id: 'suv', name: 'SUV', icon: 'car-sports' as const, description: 'Elevated comfort' }
  ];

export const topBrands = [
  { id: 'all', name: 'All Cars', image: require('@/assets/images/all.png') },
  { id: 'mercedes', name: 'Mercedes-Benz', image: require('@/assets/images/mercedes-logo.jpg') },
  { id: 'bmw', name: 'BMW', image: require('@/assets/images/bmw-logo.png') },
  { id: 'tesla', name: 'Tesla', image: require('@/assets/images/tesla-logo.png') },
  { id: 'porsche', name: 'Porsche', image: require('@/assets/images/porsche-logo.png') },
  { id: 'range-rover', name: 'Land Rover', image: require('@/assets/images/range-rover-logo.png') },
];
  
 export const popularCars = [
    {
      id: '1',
      name: 'Mercedes-Benz S-Class',
      category: 'Executive',
      pricePerDay: 75000,
      pricePerHour: 7500,
      passengers: 4,
      price: '150,000',
    type: 'Luxury',
    transmission: 'Automatic',
    rating: 4.9,
      bags: 3,
      popularFor: 'Business Meetings',
      available: true,
      image: require('@/assets/images/mercedes-s.jpg')
    },
    {
      id: '2',
      name: 'BMW 7 Series',
      category: 'Luxury',
      pricePerDay: 82000,
      pricePerHour: 8200,
      passengers: 4,
      bags: 3,
      popularFor: 'Luxury Trips',
      available: true,
      image: require('@/assets/images/bmw-7.jpg')
    },
    {
      id: '3',
      name: 'Tesla Model S',
      category: 'Electric',
      pricePerDay: 68000,
      pricePerHour: 6800,
      passengers: 5,
      bags: 2,
      popularFor: 'Eco-Friendly Travel',
      available: true,
      image: require('@/assets/images/tesla-s.png')
    },
    {
      id: '4',
      name: 'Porsche Cayenne',
      category: 'SUV',
      pricePerDay: 95000,
      pricePerHour: 9500,
      passengers: 5,
      bags: 4,
      popularFor: 'Off-Road Adventures',
      available: true,
      image: require('@/assets/images/porsche-cayenne.jpg')
    },
    {
      id: '5',
      name: 'Range Rover Sport',
      category: 'SUV',
      pricePerDay: 88000,
      pricePerHour: 8800,
      passengers: 5,
      bags: 5,
      popularFor: 'Mountain Drives',
      available: true,
      image: require('@/assets/images/range-rover.png')
    },
    {
      id: '6',
      name: 'Audi Q7',
      category: 'Family/Group',
      pricePerDay: 72000,
      pricePerHour: 7200,
      passengers: 7,
      bags: 5,
      popularFor: 'Family Vacations',
      available: true,
      image: require('@/assets/images/audi-q7.jpg')
    },
    {
      id: '7',
      name: 'Chevrolet Suburban',
      category: 'Family/Group',
      pricePerDay: 65000,
      pricePerHour: 6500,
      passengers: 8,
      bags: 6,
      popularFor: 'Large Group Travel',
      available: true,
      image: require('@/assets/images/chevrolet-suburban.jpg')
    },
    {
      id: '8',
      name: 'Cadillac Escalade',
      category: 'Luxury',
      pricePerDay: 90000,
      pricePerHour: 9000,
      passengers: 7,
      bags: 5,
      popularFor: 'VIP Events',
      available: true,
      image: require('@/assets/images/cadillac-escalade.jpg')
    },
    {
      id: '9',
      name: 'Toyota Land Cruiser',
      category: 'SUV',
      pricePerDay: 70000,
      pricePerHour: 7000,
      passengers: 8,
      bags: 5,
      popularFor: 'Safari Adventures',
      available: true,
      image: require('@/assets/images/toyota-land-cruiser.png')
    }
  ];
  
  
  // Define special deals data
export const specialPackages = [
    {
      id: '1',
      title: 'Airport Transfer',
      description: 'Reliable airport pickup and drop-off service',
      price: '45,000',
      priceDetail: 'from Airport to Destination',
      image: require('@/assets/images/airport-pickup.jpg'),
      features: ['Meet & Greet', 'Flight Tracking', '1 Hour Wait Time']
    },
    {
      id: '2',
      title: 'Wedding Chauffeur',
      description: 'Elegant cars for weddings and special ceremonies',
      price: '100,000',
      priceDetail: 'per day',
      image: require('@/assets/images/wedding-gig.jpg'),
      features: ['Decorated Vehicles', 'Professional Chauffeur', 'Flexible Timings']
    },
    {
      id: '3',
      title: 'City Tour',
      description: 'Discover popular city attractions with ease',
      price: '50,000',
      priceDetail: 'per day',
      image: require('@/assets/images/tour.jpg'),
      features: ['Personalized Itinerary', 'Knowledgeable Guide', 'Comfortable Vehicles']
    }
  ];