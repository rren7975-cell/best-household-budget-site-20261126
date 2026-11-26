// Hearth & Ledger — seed data for the Marlowe household, November 2026.
// Every figure on the site is computed from these rows: category totals,
// the dashboard summary, the donut and the reports all read this file,
// so the numbers on every page always agree with each other.

export const HOUSEHOLD = {
  name: 'The Marlowe household',
  members: 'Maya & Tom Marlowe',
  month: 'November 2026',
  currency: 'USD',
  note: 'Two salaries, two kids, one shared pot. Every dollar below is real money the household actually moved in November.',
};

export const CATEGORIES = [
  { id: 'housing', label: 'Housing', budget: 1850, color: '#1d3a2f', hint: 'Rent, kept fixed' },
  { id: 'groceries', label: 'Groceries', budget: 720, color: '#4d7c5f', hint: 'Weekly shops & markets' },
  { id: 'transport', label: 'Transport', budget: 420, color: '#c65d3b', hint: 'Fuel, metro & parking' },
  { id: 'utilities', label: 'Utilities', budget: 310, color: '#b98a2f', hint: 'Power, water, net & phones' },
  { id: 'dining', label: 'Dining out', budget: 240, color: '#a34d6d', hint: 'Cafes, takeaway & treats' },
  { id: 'entertainment', label: 'Entertainment', budget: 180, color: '#5b7fa6', hint: 'Films, streaming & days out' },
  { id: 'kids', label: 'Kids & school', budget: 350, color: '#7a6aa8', hint: 'Lunches, lessons & trips' },
  { id: 'health', label: 'Health', budget: 260, color: '#3e8e7e', hint: 'Pharmacy, dentist & gym' },
  { id: 'clothing', label: 'Clothing', budget: 150, color: '#8a6d4b', hint: 'Seasonal clothes & shoes' },
  { id: 'misc', label: 'Everyday & misc', budget: 170, color: '#8a8f7a', hint: 'Home bits, gifts & giving' },
  { id: 'savings', label: 'Savings', budget: 1200, color: '#2f5d50', hint: 'Moved to savings, not spent' },
];

// November 2026: money in (type 'income'), money out (type 'expense'),
// and the monthly savings transfer (type 'transfer').
export const TRANSACTIONS = [
  { date: '2026-11-01', merchant: 'Maya — salary', category: 'income', amount: 4200.00, note: 'Monthly pay, after tax' },
  { date: '2026-11-01', merchant: 'Maple Court — rent', category: 'housing', amount: 1850.00, note: 'November rent, paid on the 1st' },
  { date: '2026-11-01', merchant: 'Transfer to savings', category: 'savings', amount: 1200.00, note: 'Payday rule: savings moves first' },
  { date: '2026-11-02', merchant: 'GreenMart — weekly shop', category: 'groceries', amount: 148.20, note: 'Full weekly shop' },
  { date: '2026-11-02', merchant: 'School lunches — November', category: 'kids', amount: 86.00, note: 'Both kids, whole month' },
  { date: '2026-11-03', merchant: 'Metro — monthly pass', category: 'transport', amount: 96.00, note: "Tom's commuter pass" },
  { date: '2026-11-03', merchant: 'Pharmacy — Green Cross', category: 'health', amount: 34.60, note: 'Cold medicine & plasters' },
  { date: '2026-11-04', merchant: 'City Power — electricity', category: 'utilities', amount: 128.40, note: 'October usage, billed Nov 4' },
  { date: '2026-11-05', merchant: 'Noodle House', category: 'dining', amount: 42.80, note: 'Thursday dinner out' },
  { date: '2026-11-05', merchant: 'Household — bulbs & batteries', category: 'misc', amount: 22.30, note: 'Hall lights, AA batteries' },
  { date: '2026-11-06', merchant: 'GreenMart — top-up', category: 'groceries', amount: 62.40, note: 'Milk, bread, fruit' },
  { date: '2026-11-06', merchant: 'Cinema — two tickets', category: 'entertainment', amount: 34.00, note: 'Friday film night' },
  { date: '2026-11-07', merchant: 'Fuel — Shell', category: 'transport', amount: 48.50, note: 'Full tank, Saturday' },
  { date: '2026-11-07', merchant: 'Art supplies — Craft Box', category: 'kids', amount: 42.30, note: 'Paints & sketchbooks' },
  { date: '2026-11-08', merchant: 'Water bill — City Water', category: 'utilities', amount: 46.20, note: 'Quarterly water' },
  { date: '2026-11-08', merchant: 'Pizza night — Luigis', category: 'dining', amount: 36.50, note: 'Two large, one garlic bread' },
  { date: '2026-11-09', merchant: 'Farmers market', category: 'groceries', amount: 38.50, note: 'Veg box & eggs' },
  { date: '2026-11-09', merchant: 'Dentist — check-up', category: 'health', amount: 85.00, note: "Maya's six-month check" },
  { date: '2026-11-10', merchant: 'Streaming — River+', category: 'entertainment', amount: 15.99, note: 'Monthly subscription' },
  { date: '2026-11-10', merchant: 'Winter jackets — kids', category: 'clothing', amount: 68.00, note: 'Two coats, end-of-season sale' },
  { date: '2026-11-10', merchant: 'Car wash', category: 'transport', amount: 18.50, note: 'Winter wash & vacuum' },
  { date: '2026-11-11', merchant: 'Parking — City Centre', category: 'transport', amount: 12.00, note: 'Saturday market parking' },
  { date: '2026-11-11', merchant: 'Gift — aunt’s birthday', category: 'misc', amount: 35.00, note: 'Book & card for Aunt June' },
  { date: '2026-11-12', merchant: 'Internet — NorthNet', category: 'utilities', amount: 59.00, note: 'Monthly broadband' },
  { date: '2026-11-12', merchant: 'Swimming lessons', category: 'kids', amount: 78.00, note: 'November block, both kids' },
  { date: '2026-11-13', merchant: 'GreenMart — weekly shop', category: 'groceries', amount: 156.75, note: 'Full weekly shop' },
  { date: '2026-11-13', merchant: 'Books — secondhand', category: 'entertainment', amount: 18.50, note: 'Three paperbacks' },
  { date: '2026-11-14', merchant: 'Café Luna — brunch', category: 'dining', amount: 58.20, note: 'Saturday brunch for four' },
  { date: '2026-11-14', merchant: 'Tom — freelance, logo work', category: 'income', amount: 1850.00, note: 'Invoice paid, bakery rebrand' },
  { date: '2026-11-14', merchant: 'Gym — monthly', category: 'health', amount: 49.00, note: 'Joint membership' },
  { date: '2026-11-15', merchant: 'Fuel — Shell', category: 'transport', amount: 52.75, note: 'Full tank' },
  { date: '2026-11-15', merchant: 'Board game café', category: 'entertainment', amount: 28.00, note: 'Sunday games + hot chocolate' },
  { date: '2026-11-15', merchant: 'Phone case', category: 'misc', amount: 19.99, note: 'Replacement case for Tom' },
  { date: '2026-11-16', merchant: 'Corner Deli', category: 'groceries', amount: 24.30, note: 'Deli lunch supplies' },
  { date: '2026-11-16', merchant: 'Kids’ shoes', category: 'kids', amount: 64.50, note: 'School shoes, size up' },
  { date: '2026-11-17', merchant: 'Toll — ring road', category: 'transport', amount: 14.25, note: 'Airport run toll' },
  { date: '2026-11-17', merchant: 'Sushi takeaway', category: 'dining', amount: 64.00, note: 'Friday treat, family set' },
  { date: '2026-11-18', merchant: 'Mobile — both lines', category: 'utilities', amount: 62.00, note: 'Two phone plans' },
  { date: '2026-11-18', merchant: 'Socks & basics', category: 'clothing', amount: 28.40, note: 'Everyday basics' },
  { date: '2026-11-19', merchant: 'Rideshare — airport run', category: 'transport', amount: 28.40, note: 'Picking up Grandma' },
  { date: '2026-11-19', merchant: 'Mini golf', category: 'entertainment', amount: 32.00, note: 'Family round, Saturday' },
  { date: '2026-11-19', merchant: 'Plant pots — home', category: 'misc', amount: 18.90, note: 'Herb pots for the kitchen' },
  { date: '2026-11-20', merchant: 'GreenMart — weekly shop', category: 'groceries', amount: 142.90, note: 'Full weekly shop' },
  { date: '2026-11-20', merchant: 'School trip — science museum', category: 'kids', amount: 38.00, note: 'Year 5 trip, one child' },
  { date: '2026-11-20', merchant: 'Bank interest', category: 'income', amount: 85.00, note: 'Savings interest, November' },
  { date: '2026-11-21', merchant: 'Burger joint', category: 'dining', amount: 38.40, note: 'Quick Saturday lunch' },
  { date: '2026-11-21', merchant: 'Vitamins & first aid', category: 'health', amount: 28.75, note: 'Winter vitamins' },
  { date: '2026-11-22', merchant: 'Fuel — Shell', category: 'transport', amount: 46.80, note: 'Full tank' },
  { date: '2026-11-22', merchant: 'Museum entry', category: 'entertainment', amount: 24.00, note: 'Sunday exhibition, family ticket' },
  { date: '2026-11-23', merchant: 'Farmers market', category: 'groceries', amount: 41.20, note: 'Veg box & honey' },
  { date: '2026-11-23', merchant: 'Stationery & stamps', category: 'misc', amount: 12.40, note: 'Cards & postage' },
  { date: '2026-11-24', merchant: 'Café Luna — coffee', category: 'dining', amount: 22.60, note: 'Two flat whites, one cake' },
  { date: '2026-11-24', merchant: 'Tutoring books', category: 'kids', amount: 28.40, note: 'Maths workbooks' },
  { date: '2026-11-25', merchant: 'GreenMart — top-up', category: 'groceries', amount: 58.60, note: 'Top-up before the weekend' },
  { date: '2026-11-25', merchant: 'Streaming — music', category: 'entertainment', amount: 9.99, note: 'Monthly subscription' },
  { date: '2026-11-25', merchant: 'Metro top-up', category: 'transport', amount: 20.00, note: 'Stored value, pay-as-you-go' },
  { date: '2026-11-25', merchant: 'Pharmacy top-up', category: 'health', amount: 21.40, note: 'Vitamins restock' },
  { date: '2026-11-25', merchant: 'Refund — returned jacket', category: 'income', amount: 45.00, note: 'Wrong size, refunded in full' },
  { date: '2026-11-26', merchant: 'Bakery lunch', category: 'dining', amount: 24.75, note: 'Working lunch, Tom' },
  { date: '2026-11-26', merchant: 'Charity — food bank', category: 'misc', amount: 25.00, note: 'Monthly giving' },
];

// October 2026, kept as a compact summary so the dashboard's month
// switcher shows a real second month instead of an empty page.
export const OCTOBER = {
  label: 'October 2026',
  income: 6050.00,
  incomeRows: [
    { label: 'Maya — salary', amount: 4200.00 },
    { label: 'Tom — freelance', amount: 1750.00 },
    { label: 'Bank interest', amount: 80.00 },
    { label: 'Refund — returned shoes', amount: 20.00 },
  ],
  spent: {
    housing: 1850.00, groceries: 648.00, transport: 361.00, utilities: 288.00,
    dining: 246.00, entertainment: 142.00, kids: 298.00, health: 186.00,
    clothing: 74.00, misc: 121.00,
  },
  savings: 1100.00,
};

// Six months of spending (excluding savings transfers), for the trend bars.
export const TREND = [
  { month: 'Jun', spent: 4210 },
  { month: 'Jul', spent: 4385 },
  { month: 'Aug', spent: 4290 },
  { month: 'Sep', spent: 4475 },
  { month: 'Oct', spent: 4214 },
  { month: 'Nov', spent: 4391 },
];

export const GOALS = [
  { id: 'emergency', name: 'Emergency fund', target: 12000, saved: 8450, note: 'Six months of essentials, for the day something breaks.' },
  { id: 'holiday', name: 'Summer holiday', target: 3500, saved: 1925, note: 'Two weeks by the coast, flights booked in March.' },
  { id: 'bikes', name: 'New bikes', target: 900, saved: 610, note: 'Two kids’ bikes before spring, bought secondhand if we can.' },
  { id: 'repaint', name: 'Home repaint', target: 2400, saved: 300, note: 'Hall, stairs and landing — the painter is booked for May.' },
];

export const INSIGHTS = [
  { title: 'Dining out is running hot', body: 'Dining out is $47 over its $240 budget with four days left in the month. Two takeaways a week became three — the fix is one cooked Friday a week, which saves about $60 a month.' },
  { title: 'Groceries are under control', body: 'Groceries sit at $673 of a $720 budget. The weekly shop plus a market top-up beats the old habit of three small shops a week, and waste is down with it.' },
  { title: 'Savings rate: 19%', body: '$1,200 of $6,180 income went straight to savings on payday — before anything could be spent. That is the habit doing the work, not willpower.' },
  { title: 'Transport is cheaper than planned', body: 'Transport is $337 against a $420 budget. The metro pass replaced two car trips a week, and fuel is down $40 on October.' },
];
