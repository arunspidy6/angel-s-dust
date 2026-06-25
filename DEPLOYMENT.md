# Angel's Dust CMS - Deployment Guide

Complete guide to deploy your CMS to production with Supabase and Vercel.

## Architecture

```
┌─────────────────┐         ┌──────────────┐         ┌─────────────┐
│  Vercel (Web)   │────────▶│ Supabase API │────────▶│ PostgreSQL  │
│  Frontend + CMS │         │ (REST/RealTime)       │  Database   │
└─────────────────┘         └──────────────┘         └─────────────┘
```

## Step 1: Set Up Supabase Project

### 1.1 Create Supabase Account
1. Go to https://supabase.com
2. Sign up with your email or GitHub
3. Create a new project:
   - **Project Name**: angel-s-dust
   - **Database Password**: Use a strong password (save it)
   - **Region**: Select closest to your users

### 1.2 Get API Keys
In your Supabase project dashboard:
1. Go to **Settings** → **API**
2. Copy:
   - `Project URL` (e.g., `https://xxxxx.supabase.co`)
   - `anon` key (public key)
   - `service_role` key (private key - keep secret)

### 1.3 Create Database Tables

In Supabase SQL Editor, run these queries:

```sql
-- Products table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  number TEXT NOT NULL,
  title TEXT NOT NULL,
  img TEXT,
  desc TEXT NOT NULL,
  sub TEXT,
  price TEXT,
  imgLeft BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  items TEXT NOT NULL,
  total_price REAL DEFAULT 0,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id TEXT PRIMARY KEY,
  author TEXT NOT NULL,
  time TEXT,
  stars INTEGER NOT NULL,
  text TEXT NOT NULL,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies (allow public read)
CREATE POLICY "Allow public read on products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Allow public read on reviews"
  ON reviews FOR SELECT
  USING (approved = true);
```

## Step 2: Update Frontend to Use Supabase

### 2.1 Install Supabase Client
```bash
npm install @supabase/supabase-js
```

### 2.2 Create Supabase Config
Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### 2.3 Update .env Files

`.env`:
```
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

`.env.example`:
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2.4 Update Admin Panel Hooks

Update each manager to use Supabase instead of local API:

**Example for ProductsManager.tsx:**
```typescript
import { supabase } from '../lib/supabase'

const fetchProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('number', { ascending: true })
    
    if (error) throw error
    setProducts(data || [])
  } catch (err) {
    console.error('Failed to fetch products:', err)
    setProducts([])
  } finally {
    setLoading(false)
  }
}

const handleSave = async () => {
  // ... validation ...
  try {
    if (isAdding) {
      const { error } = await supabase
        .from('products')
        .insert([{ ...formData, id: `prod_${Date.now()}` }])
      if (error) throw error
    } else {
      const { error } = await supabase
        .from('products')
        .update(formData)
        .eq('id', editingId)
      if (error) throw error
    }
    fetchProducts()
  } catch (err) {
    setError('Failed to save product')
  }
}
```

**Apply similar patterns to:**
- `OrdersManager.tsx`
- `MessagesManager.tsx`
- `ReviewsManager.tsx`

### 2.5 Update Frontend Components

Update `Patisserie.tsx` and `Reviews.tsx` to fetch from Supabase instead of local API:

```typescript
import { supabase } from '../lib/supabase'

useEffect(() => {
  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('number', { ascending: true })
    
    if (data) setPlates(data)
  }
  
  fetchProducts()
}, [])
```

## Step 3: Deploy Backend to Production

### Option A: Railway (Recommended - Simple)
1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → GitHub Repo
4. Connect your angel-s-dust repo
5. Add environment variables:
   - `PORT=3001`
   - (Other env vars if needed)
6. Deploy automatically

**Backend URL**: https://your-app-name.railway.app/api/*

### Option B: Render
1. Go to https://render.com
2. Create New → Web Service
3. Connect GitHub repository
4. Set Start Command: `npm run backend`
5. Add Environment Variables
6. Deploy

### Option C: Heroku (Free tier ended, but alternatives exist)
Consider Railway or Render for free tier alternatives.

## Step 4: Deploy Frontend to Vercel

### 4.1 Update API URL
In your components, change:
```typescript
fetch('http://localhost:3001/api/...')
```

To use environment variable:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
fetch(`${API_URL}/api/...`)
```

### 4.2 Deploy to Vercel
1. Push code to GitHub
2. Go to https://vercel.com
3. Import project
4. Add environment variables:
   ```
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
   VITE_API_URL=https://your-backend-url
   ```
5. Deploy

**Frontend URL**: https://your-app.vercel.app

## Step 5: Seed Initial Data

### Add Sample Products to Supabase

Use Supabase Studio → Insert Data:

```json
{
  "id": "prod_1",
  "number": "01",
  "title": "Signature Cakes",
  "imgLeft": true,
  "img": "https://...",
  "desc": "Layered entremets finished by hand with edible gold leaf...",
  "sub": "Pistachio · Rose · Hazelnut",
  "price": "from €6"
}
```

Or use SQL insert:
```sql
INSERT INTO products VALUES (
  'prod_1', '01', 'Signature Cakes', true, 
  'https://...', 'Layered entremets...', 
  'Pistachio · Rose · Hazelnut', 'from €6',
  NOW(), NOW()
);
```

## Step 6: Set Up Auto-Sync (Optional)

### Webhook for Order Notifications
In Supabase → Database Webhooks:
- Table: `orders`
- Event: `Insert`
- HTTP Request: `https://your-email-service/webhook`
- Send notification email on new orders

### Real-Time Updates
Update admin panel to listen for changes:

```typescript
useEffect(() => {
  const channel = supabase
    .channel('orders')
    .on('postgres_changes', 
      { event: 'INSERT', schema: 'public', table: 'orders' },
      (payload) => {
        setOrders(prev => [payload.new, ...prev])
      }
    )
    .subscribe()

  return () => channel.unsubscribe()
}, [])
```

## Production Checklist

- [ ] Supabase project created with all tables
- [ ] Row Level Security (RLS) policies configured
- [ ] API keys safely stored in Vercel/Railway environment
- [ ] Frontend updated to use Supabase SDK
- [ ] Backend deployed to production server
- [ ] Vercel deployed with environment variables
- [ ] Sample products added to database
- [ ] Admin panel tested in production
- [ ] Homepage loads products from live database
- [ ] Forms submit to live database
- [ ] Error handling and loading states tested
- [ ] Email notifications configured (optional)
- [ ] Backup strategy implemented
- [ ] HTTPS enforced
- [ ] CORS configured properly

## Access Your CMS

After deployment:
- **Website**: https://your-app.vercel.app
- **Admin Panel**: https://your-app.vercel.app/admin
- **API**: https://your-backend-url/api/*

## Monitoring & Maintenance

### Monitor Supabase
- Go to Supabase Dashboard
- Check **Database** → **Monitoring**
- View Query Performance
- Set up Alerts for storage/bandwidth

### Update Deployments
```bash
# Update Vercel
git push origin main

# Update Railway/Render backend
git push origin main  # Auto-deploys via GitHub
```

## Troubleshooting

### API Connection Issues
```bash
# Check if backend is running
curl https://your-backend-url/api/products

# Check if Supabase keys are correct
# Verify in .env that VITE_SUPABASE_URL is set correctly
```

### Data Not Loading
1. Check RLS policies in Supabase
2. Verify API keys in .env
3. Check browser console for errors
4. Check Supabase logs in Dashboard

### CORS Errors
Add CORS headers in backend server:
```typescript
app.use(cors({
  origin: 'https://your-app.vercel.app',
  credentials: true,
}))
```

## Cost Breakdown (Monthly)

| Service | Free Tier | Cost |
|---------|-----------|------|
| Supabase | 500 MB storage | $25/mo for production |
| Vercel | 100 GB bandwidth | $20/mo (pro) |
| Railway | $5 credit | $7-10/mo for backend |
| **Total** | Free tier available | ~$35-50/mo |

**Note**: Most services offer generous free tiers. Supabase free tier is great for getting started!

## Security Best Practices

1. **Never commit `.env` files** - Use environment variables
2. **Use RLS policies** - Restrict database access
3. **Validate input** - Server-side validation
4. **Use HTTPS** - Always encrypted
5. **Rotate keys** - Periodically refresh API keys
6. **Monitor logs** - Watch for suspicious activity
7. **Backup data** - Enable Supabase automated backups

## Support

For help:
- Supabase Docs: https://supabase.com/docs
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Angel's Dust Repo: https://github.com/arunspidy6/angel-s-dust
