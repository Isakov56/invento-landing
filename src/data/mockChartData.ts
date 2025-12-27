import { SalesData, CategoryRevenue, TopProduct, MarketingData, Customer } from '../types/demo'

// 7-day sales trend data
export const salesTrendData: SalesData[] = [
  { day: 'Mon', sales: 42, revenue: 5600 },
  { day: 'Tue', sales: 51, revenue: 6800 },
  { day: 'Wed', sales: 48, revenue: 6200 },
  { day: 'Thu', sales: 67, revenue: 8900 },
  { day: 'Fri', sales: 82, revenue: 10500 },
  { day: 'Sat', sales: 95, revenue: 12800 },
  { day: 'Sun', sales: 73, revenue: 9400 }
]

// Revenue by category (pie chart)
export const categoryRevenueData: CategoryRevenue[] = [
  { name: 'Beverages', value: 4500, fill: '#2563EB' },
  { name: 'Bakery', value: 3200, fill: '#06B6D4' },
  { name: 'Food', value: 2800, fill: '#8B5CF6' },
  { name: 'Other', value: 1500, fill: '#64748B' }
]

// Top 5 products (bar chart)
export const topProductsData: TopProduct[] = [
  { name: 'Premium Coffee', sales: 145 },
  { name: 'Fresh Croissant', sales: 98 },
  { name: 'Club Sandwich', sales: 87 },
  { name: 'Orange Juice', sales: 76 },
  { name: 'Blueberry Muffin', sales: 65 }
]

// Marketing/customer acquisition data
export const marketingData: MarketingData[] = [
  { date: 'Week 1', customers: 45, revenue: 12000 },
  { date: 'Week 2', customers: 52, revenue: 14500 },
  { date: 'Week 3', customers: 61, revenue: 16800 },
  { date: 'Week 4', customers: 68, revenue: 18200 },
  { date: 'Week 5', customers: 79, revenue: 21500 },
  { date: 'Week 6', customers: 85, revenue: 23800 },
  { date: 'Week 7', customers: 92, revenue: 26400 },
  { date: 'Week 8', customers: 103, revenue: 29100 }
]

// Mock customer data for customer mode
export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '555-0101',
    balance: 0,
    joinDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Emma Wilson',
    email: 'emma.w@email.com',
    phone: '555-0102',
    balance: -45.50, // Debt
    joinDate: '2024-02-03'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'm.brown@email.com',
    phone: '555-0103',
    balance: 20.00, // Credit
    joinDate: '2024-01-28'
  },
  {
    id: '4',
    name: 'Sophia Davis',
    email: 'sophia.d@email.com',
    phone: '555-0104',
    balance: 0,
    joinDate: '2024-03-10'
  },
  {
    id: '5',
    name: 'James Johnson',
    email: 'jj@email.com',
    phone: '555-0105',
    balance: -12.75, // Debt
    joinDate: '2024-02-20'
  },
  {
    id: '6',
    name: 'Olivia Martinez',
    email: 'olivia.m@email.com',
    phone: '555-0106',
    balance: 50.00, // Credit
    joinDate: '2024-01-05'
  },
  {
    id: '7',
    name: 'William Garcia',
    email: 'w.garcia@email.com',
    phone: '555-0107',
    balance: 0,
    joinDate: '2024-03-01'
  },
  {
    id: '8',
    name: 'Ava Rodriguez',
    email: 'ava.r@email.com',
    phone: '555-0108',
    balance: -28.00, // Debt
    joinDate: '2024-02-14'
  }
]

// Key metrics for reports dashboard
export const keyMetrics = {
  totalRevenue: 60200,
  totalTransactions: 458,
  averageTransaction: 131.44,
  topSellingCategory: 'Beverages'
}

// Marketing metrics
export const marketingMetrics = {
  newCustomersThisMonth: 127,
  customerGrowthPercent: 23,
  customerLifetimeValue: 342,
  repeatPurchaseRate: 68,
  averageOrderValue: 24.50
}
