# 🛒 Modern E-Commerce Platform

A full-stack e-commerce application built with React.js and Node.js featuring a completely redesigned interface with modern glassmorphism aesthetics, dynamic cart functionality, and intuitive admin dashboard.

## 🚀 Features

### 🎨 Modern UI/UX
- **Glassmorphism Design** - Beautiful blur effects and translucent elements
- **Responsive Layout** - Mobile-friendly interface with smooth animations
- **Modal-Based Forms** - Seamless product/category creation without page navigation
- **Background Blur Effects** - Professional blur when modals/cart are active
- **Interactive Elements** - Hover effects and smooth transitions

### 📦 Product Management
- **CRUD Operations** - Complete product, category, and subcategory management
- **Image Upload** - Multiple image support with preview functionality
- **Product Variants** - RAM, price, and quantity variations
- **Advanced Search** - Real-time search with category/subcategory filtering
- **Grid/List Views** - Flexible product display options

### 🛒 Cart & Wishlist
- **Dynamic Cart System** - Real-time cart updates with sidebar interface
- **Cart Sidebar** - Slides in from right with item management
- **Wishlist Functionality** - Heart button integration in product details
- **Item Count Badge** - Visual cart item counter in header
- **Persistent Storage** - Cart data saved in database

### 🔐 Authentication & Security
- **JWT Authentication** - Secure user login and registration
- **Protected Routes** - Middleware-based route protection
- **User Sessions** - Persistent login with token management
- **Secure API Endpoints** - Authorization required for sensitive operations

## 🛠 Tech Stack

### Frontend
- **React 19** - Latest React with modern hooks
- **Vite** - Fast build tool and development server
- **Redux Toolkit** - State management with modern Redux
- **TailwindCSS v4** - Utility-first CSS framework with custom styling
- **Lucide React** - Beautiful SVG icon library
- **React Hot Toast** - Elegant notification system
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **MongoDB Atlas** - Cloud-based NoSQL database
- **Mongoose ODM** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing
- **Bcrypt** - Password hashing

## 📋 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone Repository
```bash
git clone https://github.com/Adilu007/ecommerce.git
cd ecommerce
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start backend server:
```bash
npm start
```
Backend will run on `http://localhost:3000`

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Start frontend development server:
```bash
npm run dev
```
Frontend will run on `http://localhost:5174`

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Categories
- `POST /api/auth/addCategory` - Create category
- `GET /api/auth/getCategories` - Get all categories

### SubCategories
- `POST /api/auth/addSubcategory` - Create subcategory
- `GET /api/auth/subcategories` - Get all subcategories

### Products
- `POST /api/auth/addproduct` - Create product (with image upload)
- `GET /api/auth/getproducts` - Get products with pagination & filters
- `GET /api/auth/productdetails/:id` - Get single product details
- `PUT /api/auth/updateproduct/:id` - Update product

### Cart
- `POST /api/auth/addToCart` - Add item to cart
- `GET /api/auth/getCart` - Get user's cart items
- `DELETE /api/auth/removeFromCart/:productId` - Remove item from cart
- `DELETE /api/auth/clearCart` - Clear entire cart

## 🎯 Key Features Explained

### Modal System
- **Add Category** - Create product categories via popup modal
- **Add SubCategory** - Create subcategories with parent category selection
- **Add Product** - Complete product creation with image upload and variants
- **Background Blur** - Professional UI effect when modals are active

### Cart Functionality
- **Add to Cart** - Click shopping cart icon on product cards
- **Heart Button** - Add to cart from product details page
- **Cart Sidebar** - View and manage cart items
- **Real-time Updates** - Instant cart count and item synchronization

### Product Management
- **Image Upload** - Support for multiple product images
- **Variants System** - RAM, price, and quantity variations per product
- **Category Hierarchy** - Products organized by category → subcategory
- **Search & Filter** - Advanced filtering by categories and subcategories

## 🎨 UI Components

### Dashboard
- **Product Grid** - Responsive product card layout
- **Sidebar Filters** - Category and subcategory filtering
- **Search Bar** - Real-time product search
- **Action Buttons** - Add category, subcategory, and product modals

### Product Cards
- **Image Display** - Product image with fallback
- **Product Info** - Title, description, and pricing
- **Interactive Buttons** - View details and add to cart
- **Hover Effects** - Smooth animations and transitions

### Cart Sidebar
- **Item Display** - Product image, name, and price
- **Remove Items** - Trash icon to remove products
- **Item Count** - Total items in header badge
- **Blur Background** - Focus effect when cart is open

## 📱 Responsive Design

- **Mobile-First** - Optimized for mobile devices
- **Tablet Support** - Adaptive layout for tablets
- **Desktop Enhanced** - Full features on larger screens
- **Touch Friendly** - Large touch targets for mobile

## 🔧 Development

### File Structure
```
ecommerce/
├── backend/
│   ├── controller/         # API route handlers
│   ├── middleware/         # Authentication & file upload
│   ├── models/            # MongoDB schemas
│   ├── router/            # Express routes
│   ├── config/            # Database configuration
│   └── server.js          # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Main page components
│   │   ├── features/      # Redux slices & services
│   │   ├── api/           # Axios configuration
│   │   └── app/           # Redux store setup
│   └── public/            # Static assets
└── README.md
```

### Available Scripts

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

#### Backend
- `npm start` - Start server
- `npm run dev` - Start with nodemon (if configured)

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Update API base URL in production

### Backend Deployment (Railway/Heroku)
1. Set environment variables
2. Configure MongoDB Atlas connection
3. Deploy with `npm start` command

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Adilu007**
- GitHub: [@Adilu007](https://github.com/Adilu007)

## 🙏 Acknowledgments

- React.js team for the amazing framework
- TailwindCSS for the utility-first CSS approach
- MongoDB team for the flexible database solution
- All open-source contributors who made this project possible

---

**Built with 💖 for modern web development and interview showcasing**