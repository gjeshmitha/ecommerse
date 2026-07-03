# E-Commerce API

A simple REST API for managing products and orders built with Node.js and Express.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

```bash
npm install
```

### Running the Server

```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in the `PORT` environment variable).

## API Endpoints

### Products

- **GET** `/products` - Get all products

```bash
curl http://localhost:3000/products
```

### Orders

- **POST** `/orders` - Create a new order
  
```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "cust_1",
    "items": [
      {"id": "prod_1", "qty": 2},
      {"id": "prod_2", "qty": 1}
    ]
  }'
```

- **GET** `/orders/:orderId` - Get order details

```bash
curl http://localhost:3000/orders/order_1234567890
```

- **PUT** `/orders/:orderId` - Update an order

```bash
curl -X PUT http://localhost:3000/orders/order_1234567890 \
  -H "Content-Type: application/json" \
  -d '{"status": "shipped"}'
```

- **DELETE** `/orders/:orderId` - Delete an order

```bash
curl -X DELETE http://localhost:3000/orders/order_1234567890
```

- **GET** `/orders/:orderId/status` - Get order status

```bash
curl http://localhost:3000/orders/order_1234567890/status
```

### Health Check

- **GET** `/health` - Check server health

```bash
curl http://localhost:3000/health
```

## Sample Products

The API includes 3 sample products:
- `prod_1`: Phone ($599.99)
- `prod_2`: Laptop ($999.99)
- `prod_3`: Headphones ($199.99)

## Notes

- Orders are stored in memory and will be lost when the server restarts
- For production use, integrate a persistent database (MongoDB, PostgreSQL, etc.)
- The app supports custom port via `PORT` environment variable

## Deployment

To deploy on a Node.js hosting platform (e.g., Railway, Render, Heroku):

```bash
npm start
```

**Note:** Vercel is a serverless platform and requires different configuration. Use a traditional Node.js hosting service for this Express app.
