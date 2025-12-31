import { Product } from '../types/demo'

export type BusinessType = 'pharmacy' | 'cafe' | 'fashion' | 'grocery' | 'cosmetics' | 'electronics' | 'hardware'

export const productsByBusiness: Record<BusinessType, Product[]> = {
  pharmacy: [
    {
      id: 1,
      name: 'Analgin 500mg',
      category: 'Pain Relief',
      price: 5000,
      stock: 150,
      icon: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Trimol 500mg',
      category: 'Pain Relief',
      price: 8000,
      stock: 120,
      icon: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      price: 4000,
      stock: 180,
      icon: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop'
    },
    {
      id: 4,
      name: 'Citramon',
      category: 'Pain Relief',
      price: 6000,
      stock: 100,
      icon: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=100&h=100&fit=crop'
    },
    {
      id: 5,
      name: 'No-Shpa 40mg',
      category: 'Antispasmodic',
      price: 12000,
      stock: 80,
      icon: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop'
    },
    {
      id: 6,
      name: 'Aspirin 500mg',
      category: 'Pain Relief',
      price: 7000,
      stock: 140,
      icon: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=100&h=100&fit=crop'
    },
    {
      id: 7,
      name: 'Amoxicillin 500mg',
      category: 'Antibiotics',
      price: 25000,
      stock: 60,
      icon: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop'
    },
    {
      id: 8,
      name: 'Nurofen 200mg',
      category: 'Pain Relief',
      price: 15000,
      stock: 90,
      icon: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=100&h=100&fit=crop'
    },
    {
      id: 9,
      name: 'Vitamin C 1000mg',
      category: 'Vitamins',
      price: 10000,
      stock: 110,
      icon: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=100&h=100&fit=crop'
    },
    {
      id: 10,
      name: 'Suprastin 25mg',
      category: 'Antihistamine',
      price: 9000,
      stock: 95,
      icon: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop'
    }
  ],
  cafe: [
    {
      id: 1,
      name: 'Espresso',
      category: 'Hot Drinks',
      price: 3.50,
      stock: 45,
      icon: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Cappuccino',
      category: 'Hot Drinks',
      price: 4.50,
      stock: 38,
      icon: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'Croissant',
      category: 'Bakery',
      price: 3.00,
      stock: 30,
      icon: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=100&h=100&fit=crop'
    },
    {
      id: 4,
      name: 'Blueberry Muffin',
      category: 'Bakery',
      price: 3.50,
      stock: 25,
      icon: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=100&h=100&fit=crop'
    },
    {
      id: 5,
      name: 'Iced Latte',
      category: 'Cold Drinks',
      price: 5.00,
      stock: 40,
      icon: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=100&h=100&fit=crop'
    },
    {
      id: 6,
      name: 'Bagel',
      category: 'Bakery',
      price: 3.25,
      stock: 20,
      icon: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=100&h=100&fit=crop'
    }
  ],
  fashion: [
    {
      id: 1,
      name: 'White T-Shirt',
      category: 'Tops',
      price: 24.99,
      stock: 45,
      icon: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=100&h=100&fit=crop&q=80'
    },
    {
      id: 2,
      name: 'Blue Jeans',
      category: 'Bottoms',
      price: 69.99,
      stock: 30,
      icon: 'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=100&h=100&fit=crop&q=80'
    },
    {
      id: 3,
      name: 'Black Trousers',
      category: 'Bottoms',
      price: 54.99,
      stock: 28,
      icon: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=100&h=100&fit=crop&q=80'
    },
    {
      id: 4,
      name: 'Polo Shirt',
      category: 'Tops',
      price: 34.99,
      stock: 35,
      icon: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=100&h=100&fit=crop&q=80'
    },
    {
      id: 5,
      name: 'Hoodie',
      category: 'Tops',
      price: 49.99,
      stock: 25,
      icon: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop&q=80'
    },
    {
      id: 6,
      name: 'Sneakers',
      category: 'Footwear',
      price: 89.99,
      stock: 20,
      icon: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=100&h=100&fit=crop&q=80'
    }
  ],
  grocery: [
    {
      id: 1,
      name: 'Fresh Milk',
      category: 'Dairy',
      price: 3.99,
      stock: 50,
      icon: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Whole Wheat Bread',
      category: 'Bakery',
      price: 2.99,
      stock: 40,
      icon: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'Organic Eggs',
      category: 'Dairy',
      price: 5.49,
      stock: 35,
      icon: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=100&h=100&fit=crop'
    },
    {
      id: 4,
      name: 'Fresh Tomatoes',
      category: 'Produce',
      price: 3.49,
      stock: 60,
      icon: 'https://images.unsplash.com/photo-1546470427-e26264be0b7c?w=100&h=100&fit=crop'
    },
    {
      id: 5,
      name: 'Bananas',
      category: 'Produce',
      price: 1.99,
      stock: 80,
      icon: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=100&h=100&fit=crop'
    },
    {
      id: 6,
      name: 'Orange Juice',
      category: 'Beverages',
      price: 4.99,
      stock: 30,
      icon: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=100&h=100&fit=crop'
    }
  ],
  cosmetics: [
    {
      id: 1,
      name: 'Matte Lipstick',
      category: 'Makeup',
      price: 24.99,
      stock: 40,
      icon: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Face Moisturizer',
      category: 'Skincare',
      price: 34.99,
      stock: 30,
      icon: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'Eyeshadow Palette',
      category: 'Makeup',
      price: 49.99,
      stock: 25,
      icon: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=100&h=100&fit=crop'
    },
    {
      id: 4,
      name: 'Perfume',
      category: 'Fragrance',
      price: 79.99,
      stock: 20,
      icon: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=100&h=100&fit=crop'
    },
    {
      id: 5,
      name: 'Nail Polish',
      category: 'Makeup',
      price: 12.99,
      stock: 50,
      icon: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=100&h=100&fit=crop'
    },
    {
      id: 6,
      name: 'Serum',
      category: 'Skincare',
      price: 44.99,
      stock: 28,
      icon: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=100&h=100&fit=crop'
    }
  ],
  electronics: [
    {
      id: 1,
      name: 'Wireless Earbuds',
      category: 'Audio',
      price: 129.99,
      stock: 35,
      icon: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Phone Case',
      category: 'Accessories',
      price: 24.99,
      stock: 60,
      icon: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'USB-C Cable',
      category: 'Accessories',
      price: 19.99,
      stock: 80,
      icon: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=100&h=100&fit=crop'
    },
    {
      id: 4,
      name: 'Power Bank',
      category: 'Accessories',
      price: 49.99,
      stock: 40,
      icon: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=100&h=100&fit=crop'
    },
    {
      id: 5,
      name: 'Smart Watch',
      category: 'Wearables',
      price: 299.99,
      stock: 15,
      icon: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop'
    },
    {
      id: 6,
      name: 'Screen Protector',
      category: 'Accessories',
      price: 14.99,
      stock: 70,
      icon: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=100&h=100&fit=crop'
    }
  ],
  hardware: [
    {
      id: 1,
      name: 'Cordless Drill',
      category: 'Power Tools',
      price: 89.99,
      stock: 25,
      icon: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Hammer',
      category: 'Hand Tools',
      price: 19.99,
      stock: 50,
      icon: 'https://images.unsplash.com/photo-1636907810002-034c3f03d015?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'Screwdriver Set',
      category: 'Hand Tools',
      price: 29.99,
      stock: 40,
      icon: 'https://images.unsplash.com/photo-1608890461305-52575f4b007a?w=100&h=100&fit=crop'
    },
    {
      id: 4,
      name: 'Paint Brush Set',
      category: 'Painting',
      price: 24.99,
      stock: 35,
      icon: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=100&h=100&fit=crop'
    },
    {
      id: 5,
      name: 'Tape Measure',
      category: 'Measuring',
      price: 12.99,
      stock: 60,
      icon: 'https://images.unsplash.com/photo-1606406325286-a1f8c5d10478?w=100&h=100&fit=crop'
    },
    {
      id: 6,
      name: 'Safety Gloves',
      category: 'Safety',
      price: 9.99,
      stock: 80,
      icon: 'https://images.unsplash.com/photo-1625050193657-b2cff10674b4?w=100&h=100&fit=crop'
    }
  ]
}

// Default products for backwards compatibility
export const products: Product[] = productsByBusiness.pharmacy
