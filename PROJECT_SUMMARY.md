# Ajio Clone 2 - Advanced E-Commerce Platform

## ✅ Project Status: COMPLETE & RUNNING

### 🎯 Overview
A full-featured e-commerce platform inspired by Ajio, built with React + Vite (frontend) and Flask (backend).

---

## 🚀 Currently Running Servers

### Backend API
- **URL:** http://127.0.0.1:5000
- **Framework:** Flask + Flask-CORS
- **Features:** REST API with 32 categorized products, cart management

### Frontend Application
- **URL:** http://localhost:5174
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6

---

## 📦 Backend API Endpoints

### Products
- `GET /products` - Get all products (with optional `?category=CATEGORY` filter)
- `GET /products/<id>` - Get single product details
- `GET /categories` - Get all available categories

### Cart Operations
- `GET /cart` - View cart items
- `POST /cart` - Add item to cart
- `DELETE /cart/<id>` - Remove item from cart
- `POST /cart/clear` - Clear entire cart

---

## 📊 Product Catalog (32 Products)

### Categories Included:
1. **MEN** (5 products)
   - Oversized Denim Jacket, Track Pants, Slim Fit Shirt, Linen Shirt, Polo Shirt

2. **WOMEN** (5 products)
   - Floral Maxi Dress, High-Waist Jeans, Denim Jacket, Oversized Hoodie, Leggings

3. **FOOTWEAR** (5 products)
   - Men's Leather Sneakers, Women's Block Heel Sandals, Kids' Running Sneakers, Men's Performance Running Shoes, Women's Sport Sneakers

4. **ACTIVEWEAR** (3 products)
   - Women's Sports Bra Set, Women's Sport Tank Top, Women's Leggings

5. **ACCESSORIES** (8 products)
   - Women's Chain Crossbody Bag, Kids' Backpack Set, Wireless Earbuds, Sports Water Bottle, Men's Travel Backpack, Women's Sunglasses, Men's Leather Wallet, Men's Formal Belt

6. **KIDS** (3 products)
   - Graphic Tee Pack, Denim Shorts, Hoodie Sweatshirt

7. **HOME** (3 products)
   - Printed Cushion Cover, Terry Cotton Towels, Ceramic Vase

### Product Details Include:
- ID, Name, Brand, Category, Price (₹)
- Rating (out of 5)
- Detailed Description
- Available Sizes
- Usage Category
- Product Image URLs (Unsplash)

---

## 🖼️ Frontend Pages & Features

### 1. **Home Page** (`/`)
- Hero section with Ajio branding
- Category showcase with quick links
- Featured products grid
- Dynamic product display (9 products)
- Category filter navigation

### 2. **Category Page** (`/category/:categoryName`)
- Category-specific product filtering
- Grid display of all items in category
- Individual product cards with quick add-to-cart

### 3. **Product Details** (`/product/:id`)
- Full product information layout
- High-quality product image
- Brand, category, price, rating
- Size options display
- Usage recommendations
- Add to cart functionality
- View cart redirect button

### 4. **Shopping Cart** (`/cart`)
- View all cart items with thumbnails
- Item details (brand, category, price)
- Remove item functionality
- Real-time total calculation
- Proceed to checkout button

### 5. **Checkout** (`/checkout`)
- Order form with customer details
- Billing address input
- Order summary display
- Place order confirmation

### 6. **Authentication Pages**
- Login page (`/login`)
- Signup page (`/signup`)

---

## 🧩 Frontend Components

### Reusable Components:
1. **Navbar** - Top navigation with logo, search, menu links, cart icon
2. **Footer** - Footer with quick links, social media, copyright
3. **ProductCard** - Reusable product display card with image, name, price, rating, add-to-cart

### Page Components:
- Home, Category, ProductView, Cart, Checkout, Login, Signup

---

## 🛠️ Tech Stack

### Backend
- Python 3.x
- Flask 3.1.3
- Flask-CORS 6.0.2
- JSON for data serialization

### Frontend
- React 18
- Vite 8.0.12
- React Router DOM v6
- Tailwind CSS 3
- Modern JavaScript (ES6+)

---

## 📝 API Integration

All frontend pages are integrated with the backend API at `http://127.0.0.1:5000`:

```javascript
// Example: Fetch products
const apiBase = 'http://127.0.0.1:5000'
fetch(`${apiBase}/products`)
  .then(response => response.json())
  .then(data => setProducts(data))

// Example: Add to cart
fetch(`${apiBase}/cart`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(product)
})
```

---

## 🎨 UI Features

- **Modern Design:** Gradient headers, rounded corners, shadow effects
- **Responsive Layout:** Mobile-first design with Tailwind breakpoints
- **Color Scheme:** Slate + Emerald accent colors
- **Interactive Elements:** Hover effects, transitions, smooth navigation
- **Product Display:** Image galleries, detailed information cards
- **Cart Management:** Real-time updates, item quantity display

---

## 🚀 How to Use

### Start Backend:
```bash
cd backend
python app.py
# Runs on http://127.0.0.1:5000
```

### Start Frontend:
```bash
cd frontend
npm run dev
# Runs on http://localhost:5174
```

### Access Application:
- Open browser and navigate to `http://localhost:5174`
- Browse products, view categories, add items to cart
- Complete checkout process

---

## 📁 Project Structure

```
ajio_clone2/
├── backend/
│   ├── app.py (Flask server with 32 products + endpoints)
│   └── Requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx (Main router)
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Category.jsx
│   │   │   ├── ProductView.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
```

---

## ✨ Key Features Implemented

- ✅ Full product catalog with 32 items across 7 categories
- ✅ RESTful API backend with CORS support
- ✅ Dynamic product filtering by category
- ✅ Shopping cart with add/remove functionality
- ✅ Product detail view with specifications
- ✅ Responsive design for all screen sizes
- ✅ Modern UI with Tailwind CSS
- ✅ Real-time API integration
- ✅ Image loading from Unsplash
- ✅ Price calculations and totals

---

## 🎉 Deployment Ready

The application is fully functional and ready for:
- Local development and testing
- Feature extensions and customizations
- Database integration (currently using in-memory storage)
- Production deployment with a production WSGI server

---

## 📞 Support

For local development, ensure:
- Node.js 14+ is installed (for frontend)
- Python 3.8+ is installed (for backend)
- Both servers are running on their respective ports
- CORS is enabled on the backend for frontend requests

Enjoy your advanced Ajio-inspired e-commerce platform! 🛍️
