# Inventory Management System - MERN Stack

A comprehensive inventory management application built with MongoDB, Express.js, React, and Node.js (MERN Stack).

## Features

✅ **User Authentication**
- User registration and login
- Role-based access control (Admin, Manager, Staff)
- JWT token-based authentication

✅ **Product Management**
- Add, update, delete products
- SKU management
- Category organization
- Supplier tracking
- Product search functionality

✅ **Inventory Tracking**
- Inbound stock movements
- Outbound stock movements
- Stock adjustments
- Low stock alerts
- Inventory history logs

✅ **Dashboard**
- Real-time inventory overview
- Stock level monitoring
- Transaction history
- Low stock warnings

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcryptjs (Password hashing)

**Frontend:**
- React
- Axios (HTTP client)
- React Router
- CSS/Tailwind CSS

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Shreya-jere-69/inventory-management-mern.git
cd inventory-management-mern
```

2. **Backend Setup**
```bash
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT_SECRET
npm run dev
```

3. **Frontend Setup**
```bash
cd client
npm install
npm start
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/inventory-management
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/search/:query` - Search products

### Inventory
- `GET /api/inventory` - Get all transactions
- `GET /api/inventory/product/:productId` - Get product inventory
- `POST /api/inventory` - Create inventory transaction
- `GET /api/inventory/low-stock` - Get low stock items

## Project Structure

```
inventory-management-mern/
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Inventory.js
├── routes/
│   ├── auth.js
│   ├── products.js
│   └── inventory.js
├── middleware/
│   └── auth.js
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
├── server.js
├── package.json
└── .env.example
```

## Usage

### Register a User
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "admin"
}
```

### Add a Product
```bash
POST http://localhost:5000/api/products
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "name": "Laptop",
  "sku": "LAP-001",
  "category": "Electronics",
  "price": 999,
  "quantity": 50,
  "reorderLevel": 10,
  "supplier": "TechSupplies Inc."
}
```

### Create Inventory Transaction
```bash
POST http://localhost:5000/api/inventory
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "productId": "product_id_here",
  "type": "inbound",
  "quantity": 20,
  "reason": "Purchase Order",
  "reference": "PO-12345"
}
```

## Development

### Run Backend with Nodemon
```bash
npm run dev
```

### Run Frontend
```bash
npm run client
```

### Run Both Concurrently (from root)
```bash
npm install concurrently
npm run dev-all
```

## Production Build

```bash
cd client
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Shreya Jere

## Support

For support, email shreya@example.com or open an issue in the repository.
