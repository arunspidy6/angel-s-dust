# Angel's Dust CMS

A comprehensive content management system for managing products, orders, messages, and reviews for Angel's Dust Patisserie.

## Features

- 📦 **Product Management** - Add, edit, and delete bakery items
- 🛍️ **Order Management** - Track pre-orders and manage order status
- 💬 **Message Management** - Collect and manage contact form submissions
- ⭐ **Review Management** - Approve, publish, and manage customer reviews

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Servers

Run both frontend and backend together:

```bash
npm run dev:all
```

Or run them separately:

```bash
# Frontend only (port 5174)
npm run dev

# Backend only (port 3001)
npm run backend
```

### 3. Access the CMS

- **Website**: http://localhost:5174
- **Admin Panel**: http://localhost:5174/admin
- **API**: http://localhost:3001/api/*

## Database

The CMS uses SQLite for data storage. The database file (`cms.db`) is automatically created on first run in the project root. It's not tracked in git.

### Tables

- **products** - Menu items and pastries
- **orders** - Customer pre-orders
- **messages** - Contact form submissions
- **reviews** - Customer reviews (with approval workflow)

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Delete order

### Messages
- `GET /api/messages` - Get all messages
- `POST /api/messages` - Create new message
- `DELETE /api/messages/:id` - Delete message

### Reviews
- `GET /api/reviews` - Get published reviews
- `POST /api/reviews` - Submit new review (requires approval)
- `PUT /api/reviews/:id` - Update review (approve/reject)
- `DELETE /api/reviews/:id` - Delete review

## Admin Dashboard

The admin panel is accessible at `/admin` and provides a tabbed interface for managing all content:

### Products Tab
- View, add, edit, and delete products
- Manage images, pricing, descriptions
- Control left/right image layout

### Orders Tab
- View all orders with customer details
- Track order status (pending, confirmed, shipped, completed, cancelled)
- View order items and notes

### Messages Tab
- View contact form submissions
- Mark as read (visual indicator)
- Reply via email link
- Delete messages

### Reviews Tab
- **Pending Approvals** - New reviews awaiting moderation
- **Published** - Approved reviews shown on website
- Approve/reject pending reviews
- Delete any review

## Frontend Integration

The website automatically fetches data from the CMS:

- **Products** - Displayed on homepage patisserie section
- **Orders** - Pre-order form submits to API
- **Messages** - Contact form submits to API
- **Reviews** - Reviews carousel shows published reviews

All components have fallback defaults in case the API is unavailable.

## Example: Adding a New Product

1. Go to http://localhost:5174/admin
2. Click "Products" tab
3. Click "+ Add Product"
4. Fill in the form:
   - Number (e.g., "06")
   - Title (e.g., "Raspberry Tart")
   - Image URL
   - Description
   - Sub (flavours/varieties)
   - Price
   - Image position (left/right)
5. Click "Save"

The new product immediately appears on the homepage!

## Troubleshooting

### Backend won't start
- Ensure port 3001 is available
- Check that Node.js and npm are installed
- Run `npm install` to ensure all dependencies are installed

### API not responding
- Ensure backend is running (`npm run backend`)
- Check that http://localhost:3001 is accessible
- Look for error messages in the backend terminal

### Database issues
- Delete `cms.db` to reset to a fresh database
- The database will be recreated on next backend start

## Deployment

When deploying to production:

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Update API URL in components (change from `http://localhost:3001` to your production API URL)

3. Run backend on your server:
   ```bash
   npm run backend
   ```

4. Serve the built frontend from the `dist/` folder

## Environment Variables

See `.env.example` for available configuration options:
- `PORT` - Backend server port (default: 3001)
- `REACT_APP_API_URL` - Frontend API base URL

## Support

For issues or feature requests, check the GitHub repository.
