// Product types for POS demo
export interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  icon: string
}

export interface CartItem extends Product {
  quantity: number
}

// Customer types
export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  balance: number // Negative for debt, positive for credit
  joinDate: string
  avatar?: string
}

// Testimonial types
export interface Testimonial {
  id: string
  name: string
  role: string
  business: string
  businessType: string
  rating: number
  quote: string
  avatar?: string
  results?: {
    metric: string
    value: string
  }
}

// Chart data types
export interface SalesData {
  day: string
  sales: number
  revenue: number
}

export interface CategoryRevenue {
  name: string
  value: number
  fill?: string
}

export interface TopProduct {
  name: string
  sales: number
}

export interface MarketingData {
  date: string
  customers: number
  revenue: number
}
