# ALX Trendz

A modern, responsive ecommerce platform built with Next.js, TypeScript, and Tailwind CSS. ALX Trendz offers a seamless shopping experience with real-time product data, advanced filtering, and cart management.

## 🚀 Features

### Core Functionality

- **Product Catalog**: Browse products with advanced filtering and sorting
- **Product Details**: Detailed product pages with multiple images and descriptions
- **Shopping Cart**: Add, remove, and manage items with persistent storage
- **Category Filtering**: Filter products by categories with responsive navigation
- **Search & Sort**: Sort products by name, price, and rating
- **Responsive Design**: Mobile-first design that works on all devices

### User Experience

- **Hero Carousel**: Featured products showcase with auto-play functionality
- **Product Cards**: Clean, informative product displays with hover effects
- **Loading States**: Smooth loading indicators for better UX
- **Error Handling**: Graceful error states with retry mechanisms
- **Cart Persistence**: Cart data persists across browser sessions

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons**: [Heroicons](https://heroicons.com/)
- **API**: [DummyJSON](https://dummyjson.com/) for product data

## 📁 Project Structure

```next
alx-trendz/
├── app/
│   ├── cart/
│   │   └── page.tsx              # Shopping cart page
│   ├── products/
│   │   ├── [productId]/
│   │   │   └── page.tsx          # Individual product details
│   │   └── page.tsx              # Products listing page
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Home page
├── components/
│   ├── products/
│   │   ├── ProductCard.tsx       # Product card component
│   │   ├── ProductList.tsx       # Products grid with filtering
│   │   ├── ProductCarousel.tsx   # Hero carousel for featured products
│   │   └── Categories.tsx        # Category filter component
│   └── ui/                       # Reusable UI components
├── store/
│   └── productStore.ts           # Zustand store for state management
├── interfaces/
│   └── index.ts                  # TypeScript interfaces
└── public/
    └── images/                   # Static assets
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js 18+ and npm/yarn
- Git

### Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/alx-trendz.git
   cd alx-trendz
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 API Integration

### DummyJSON API

ALX Trendz integrates with [DummyJSON](https://dummyjson.com/) for product data (as placeholders):

#### Endpoints Used

- `GET /products` - Fetch all products
- `GET /products/category/{category}` - Fetch products by category
- `GET /products/categories` - Fetch all available categories

#### Data Structure

```typescript
interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage?: number;
  category: string;
  description: string;
  thumbnail: string;
  images: string[];
  brand: string;
  stock: number;
  rating: number;
}
```

### State Management

The application uses Zustand for efficient state management:

```typescript
//  Store features
- Product fetching and caching
- Cart management with persistence
- Category filtering
- Search and sorting functionality
- Error handling and loading states
```

## 🎨 Key Components

<!-- ### ProductCarousel

- Auto-playing hero carousel featuring top-rated products
- Manual navigation with arrows and dot indicators
- Responsive design with dynamic content
- Integrated with store for real-time data -->

### ProductList

- Grid layout with responsive breakpoints
- Category filtering with mobile dropdown
- Price sorting (ascending/descending)
- Loading and error states

### ProductCard

- Product image, name, price, and discount display
- Add to cart functionality
- Hover effects and transitions
- Link to detailed product page

### Cart

- Add, remove, and update item quantities
- Real-time price calculations
- Shipping and tax calculations
- Responsive design for all screen sizes
- Persistent storage using localStorage

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md/lg)
- **Desktop**: > 1024px (xl)

### Key Features

- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized images and loading

## 🚀 Deployment

### Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com/)
3. Deploy with zero configuration

## 🧪 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 🔮 Future Enhancements

### Planned Features

- User authentication and profiles
- Wishlist functionality
- Product reviews and ratings
- Advanced search with filters
- Order history and tracking
- Payment integration (Stripe/PayPal)
- Admin dashboard
- Email notifications

### Technical Improvements

- PWA capabilities
- Advanced caching strategies
- Database integration (PostgreSQL/MongoDB)
- Real-time inventory updates
- Performance optimizations
- SEO enhancements

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use semantic commit messages
- Ensure responsive design compatibility
- Add proper error handling
- Include loading states for async operations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<!-- ## 🙏 Acknowledgments

- [DummyJSON](https://dummyjson.com/) for providing realistic test data
- [Next.js](https://nextjs.org/) team for the excellent framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Zustand](https://zustand-demo.pmnd.rs/) for lightweight state management -->

<!-- ## 📞 Support

For support, please open an issue on GitHub or contact [your-email@example.com](mailto:your-email@example.com).

--- -->
